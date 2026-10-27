'use client'

/**
 * Shown when a signed-in user has no sections granted. Without this they would be
 * redirected in a loop between sections they cannot open.
 */
export default function NoAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-900 mb-2">No sections assigned</h1>
        <p className="text-sm text-gray-600">
          Your account does not have access to any sections yet. Please ask an administrator
          to grant you the permissions you need.
        </p>
      </div>
    </div>
  )
}
