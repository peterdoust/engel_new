import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/adminAuth'
import { allowedSections, isAdmin, sanitizePermissions } from '@/lib/permissions'

export const dynamic = 'force-dynamic'

/**
 * Identity + effective permissions for the current session.
 *
 * The admin shell calls this on load to decide which nav entries to render. It is
 * a convenience for the UI only — every route still enforces its own permission,
 * so a tampered client gains nothing by lying about what came back from here.
 */
export async function GET(request: NextRequest) {
  const auth = await authenticate(request)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { user } = auth
  const admin = isAdmin(user)

  return NextResponse.json({
    success: true,
    user: {
      id: String(user._id),
      email: user.email,
      name: (user as any).name || '',
      role: admin ? 'admin' : 'user',
      permissions: admin ? {} : sanitizePermissions(user.permissions),
      sections: allowedSections(user),
      canManageUsers: admin,
    },
  })
}
