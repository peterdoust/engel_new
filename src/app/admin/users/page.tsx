'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { SECTIONS, supportsAction, activeActions, type PermissionMap, type SectionKey } from '@/lib/permissions'

// Columns worth rendering: an action no section implements is dropped entirely.
const COLUMNS = activeActions()

type ManagedUser = {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  permissions: PermissionMap
  createdAt: string | null
  lastLogin: string | null
}

type FormState = {
  id: string | null
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
  permissions: PermissionMap
}

const MIN_PASSWORD_LENGTH = 12

const emptyForm: FormState = {
  id: null,
  email: '',
  name: '',
  password: '',
  role: 'user',
  permissions: {},
}

const authHeaders = () => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('raffle_token') : null
  return token ? { 'x-admin-key': token, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<ManagedUser | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/users', { headers: authHeaders() })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load users')
      setUsers(data.users || [])
      setCurrentUserId(data.currentUserId || null)
    } catch (err: any) {
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setForm(emptyForm)
    setShowForm(true)
    setError('')
    setNotice('')
  }

  const openEdit = (user: ManagedUser) => {
    setForm({
      id: user.id,
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
      permissions: user.permissions || {},
    })
    setShowForm(true)
    setError('')
    setNotice('')
  }

  const toggle = (section: SectionKey, action: 'view' | 'edit' | 'delete') => {
    setForm(prev => {
      const current = prev.permissions[section] || {}
      const next = { ...current, [action]: !current[action] }
      // Edit/delete are meaningless without view, and unchecking view should not
      // leave orphaned write flags behind.
      if ((action === 'edit' || action === 'delete') && next[action]) next.view = true
      if (action === 'view' && !next.view) {
        next.edit = false
        next.delete = false
      }
      const permissions = { ...prev.permissions }
      if (!next.view && !next.edit && !next.delete) delete permissions[section]
      else permissions[section] = next
      return { ...prev, permissions }
    })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setNotice('')

    if (!form.id && form.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }
    if (form.id && form.password && form.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }

    setSaving(true)
    try {
      const isEdit = Boolean(form.id)
      const payload: Record<string, unknown> = {
        name: form.name,
        role: form.role,
        permissions: form.role === 'admin' ? {} : form.permissions,
      }
      if (isEdit) payload.id = form.id
      else payload.email = form.email
      if (form.password) payload.password = form.password

      const res = await fetch('/api/admin/users', {
        method: isEdit ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')

      setNotice(isEdit ? 'User updated.' : 'User created.')
      setShowForm(false)
      setForm(emptyForm)
      await load()
    } catch (err: any) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const doDelete = async (user: ManagedUser) => {
    setError('')
    setNotice('')
    try {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      setNotice(`Deleted ${user.email}.`)
      setConfirmDelete(null)
      await load()
    } catch (err: any) {
      setError(err.message || 'Delete failed')
      setConfirmDelete(null)
    }
  }

  const summarize = (user: ManagedUser) => {
    if (user.role === 'admin') return 'All sections'
    const granted = SECTIONS.filter(s => user.permissions?.[s.key]?.view)
    if (granted.length === 0) return 'No access'
    return granted.map(s => s.label).join(', ')
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2653]">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create users and choose exactly which sections they can access.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="shrink-0 px-4 py-2.5 bg-[#1d2653] text-white text-xs font-semibold rounded-lg hover:bg-[#132a55] transition-colors"
        >
          + Add user
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}
      {notice && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
          {notice}
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="mb-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-sm font-bold text-[#1d2653] mb-4">
            {form.id ? `Edit ${form.email}` : 'New user'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                disabled={Boolean(form.id)}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password {form.id && <span className="font-normal text-gray-400">(leave blank to keep)</span>}
              </label>
              <input
                type="password"
                required={!form.id}
                minLength={form.password ? MIN_PASSWORD_LENGTH : undefined}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
              <select
                value={form.role}
                disabled={Boolean(form.id) && form.id === currentUserId}
                onChange={e => setForm({ ...form, role: e.target.value as 'admin' | 'user' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
              >
                <option value="user">User — only granted sections</option>
                <option value="admin">Admin — full access, manages users</option>
              </select>
            </div>
          </div>

          {form.role === 'user' ? (
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Section permissions</label>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600">Section</th>
                      {COLUMNS.map(action => (
                        <th key={action} className="px-4 py-2.5 text-xs font-semibold text-gray-600 w-20 capitalize">
                          {action}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SECTIONS.map(section => {
                      const grant = form.permissions[section.key] || {}
                      return (
                        <tr key={section.key} className="border-t border-gray-100">
                          <td className="px-4 py-2.5 text-gray-800">{section.label}</td>
                          {COLUMNS.map(action => (
                            <td key={action} className="px-4 py-2.5 text-center">
                              {supportsAction(section.key, action) ? (
                                <input
                                  type="checkbox"
                                  checked={grant[action] === true}
                                  onChange={() => toggle(section.key, action)}
                                  className="w-4 h-4 accent-[#1d2653] cursor-pointer"
                                  aria-label={`${action} ${section.label}`}
                                />
                              ) : (
                                <span
                                  className="text-gray-300 select-none"
                                  title={`${section.label} is view-only — it has no ${action} function`}
                                >
                                  —
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Edit includes View. A dash means the section has no such function — those
                are view-only in the admin panel.
              </p>
            </div>
          ) : (
            <p className="mb-4 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              Admins always have full access to every section and can manage users.
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 bg-[#D4AF37] text-[#1d2653] text-xs font-bold rounded-lg hover:bg-[#c4a02f] disabled:opacity-50"
            >
              {saving ? 'Saving...' : form.id ? 'Save changes' : 'Create user'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setForm(emptyForm)
              }}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Sections</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No users yet.</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{user.name || '—'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-[11px] font-bold ${
                        user.role === 'admin'
                          ? 'bg-[#1d2653] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'admin' ? 'ADMIN' : 'USER'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{summarize(user)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(user)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#1d2653] hover:bg-gray-100 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(user)}
                        disabled={user.id === currentUserId}
                        title={user.id === currentUserId ? 'You cannot delete your own account' : undefined}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-base font-bold text-gray-900 mb-2">Delete user?</h3>
            <p className="text-sm text-gray-600 mb-5">
              <span className="font-semibold">{confirmDelete.email}</span> will lose access
              immediately. This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmDelete)}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
