import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { SEO_COLLECTION, getAllSeoMeta } from '@/lib/seo'
import { SEO_PAGES, getSeoPage } from '@/lib/seoPages'
import { requirePermission } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const updateSchema = z.object({
  path: z.string().min(1),
  title: z.string().max(200).optional().default(''),
  description: z.string().max(400).optional().default(''),
})

export async function GET(request: NextRequest) {
  try {
    const gate = await requirePermission(request, 'seo', 'view')
    if (gate.error) return gate.error

    const resolved = await getAllSeoMeta(SEO_PAGES)
    const byPath = new Map(resolved.map(r => [r.path, r]))

    const pages = SEO_PAGES.map(page => {
      const r = byPath.get(page.path)!
      return {
        type: page.type,
        path: page.path,
        label: page.label,
        defaultTitle: page.defaultTitle,
        defaultDescription: page.defaultDescription,
        title: r.title,
        description: r.description,
        isTitleOverridden: r.titleSource === 'db',
        isDescriptionOverridden: r.descriptionSource === 'db',
      }
    })

    return NextResponse.json({ success: true, pages, total: pages.length })
  } catch (error) {
    console.error('Error fetching SEO settings:', error)
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const gate = await requirePermission(request, 'seo', 'edit')
    if (gate.error) return gate.error
    const auth = gate.auth

    const parsed = updateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })
    }

    const { path } = parsed.data
    const page = getSeoPage(path)
    if (!page) {
      return NextResponse.json({ error: `Unknown page: ${path}` }, { status: 400 })
    }

    const title = parsed.data.title.trim()
    const description = parsed.data.description.trim()

    const collection = auth.db.collection(SEO_COLLECTION)
    await collection.createIndex({ path: 1 }, { unique: true })

    if (!title && !description) {
      // Both fields cleared — drop the override entirely so the defaults apply again.
      await collection.deleteOne({ path })
    } else {
      await collection.updateOne(
        { path },
        {
          $set: {
            path,
            type: page.type,
            title,
            description,
            updatedAt: new Date(),
            updatedBy: (auth.user as any).name || auth.user.email || 'admin',
          },
        },
        { upsert: true }
      )
    }

    // Without this the edit would not surface on the live page until the next deploy.
    revalidatePath(path)
    revalidatePath(path, 'layout')

    return NextResponse.json({
      success: true,
      path,
      title: title || page.defaultTitle,
      description: description || page.defaultDescription,
      isTitleOverridden: Boolean(title),
      isDescriptionOverridden: Boolean(description),
    })
  } catch (error) {
    console.error('Error saving SEO settings:', error)
    return NextResponse.json({ error: 'Failed to save SEO settings' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Gated on 'edit', not a separate delete: this removes a custom override so the
    // page falls back to its built-in default. PUT with both fields blank performs
    // the identical deleteOne, so requiring more here would only be theatre.
    const gate = await requirePermission(request, 'seo', 'edit')
    if (gate.error) return gate.error
    const auth = gate.auth

    const path = request.nextUrl.searchParams.get('path')
    if (!path || !getSeoPage(path)) {
      return NextResponse.json({ error: 'Unknown page' }, { status: 400 })
    }

    await auth.db.collection(SEO_COLLECTION).deleteOne({ path })
    revalidatePath(path)
    revalidatePath(path, 'layout')

    return NextResponse.json({ success: true, path })
  } catch (error) {
    console.error('Error resetting SEO settings:', error)
    return NextResponse.json({ error: 'Failed to reset SEO settings' }, { status: 500 })
  }
}
