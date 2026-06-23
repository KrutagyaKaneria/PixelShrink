/**
 * EmptyState — shown when no files are uploaded.
 * Matches Stitch "Empty State (Landing)" screen:
 *   - Upload icon in indigo circle
 *   - "Drag & drop images here" headline
 *   - Supported formats sub-line
 *   - Three trust badges: 100% Private, Instant, Free Forever
 *
 * NOTE: This renders INSIDE the Dropzone area (below the dashed border).
 * The actual drag-and-drop zone is in Dropzone.jsx.
 */
function EmptyState() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">

      {/* Trust badges row */}
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
        {[
          {
            icon: (
              <svg className="w-5 h-5 text-primary-ct dark:text-primary-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            ),
            title: '100% Private',
            desc: 'Local processing only',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-primary-ct dark:text-primary-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            ),
            title: 'Instant',
            desc: 'WASM-powered speed',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-primary-ct dark:text-primary-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            ),
            title: 'Free Forever',
            desc: 'No limits or accounts',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="
              flex-1 flex items-start gap-3 px-4 py-4
              rounded-xl border border-outline-var dark:border-dark-ct
              bg-surface-lowest dark:bg-dark-surface
              shadow-ambient
            "
          >
            <div className="w-9 h-9 rounded-lg bg-primary-fixed dark:bg-dark-ct flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="font-geist font-semibold text-sm text-on-surface dark:text-dark-on leading-tight">{title}</p>
              <p className="text-xs text-on-surface-var dark:text-dark-on-muted mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
