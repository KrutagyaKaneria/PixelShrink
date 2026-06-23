/**
 * Header — matches Stitch PixelShrink design:
 *   logo mark (indigo square icon) + "PixelShrink" wordmark left-aligned
 *   sun/moon toggle top-right
 */
const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

function Header({ isDark, onToggleDark }) {
  return (
    <header className="w-full px-4 sm:px-6 py-4 border-b border-outline-var dark:border-dark-ct bg-surface dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">

        {/* Logo mark + Wordmark */}
        <div className="flex items-center gap-2.5">
          {/* Icon mark — indigo rounded square */}
          <div className="w-8 h-8 rounded-lg bg-primary-ct flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-4.5 h-4.5 text-white" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          {/* Wordmark */}
          <span className="font-geist font-semibold text-[17px] tracking-tight text-on-surface dark:text-dark-on">
            PixelShrink
          </span>
        </div>

        {/* Right: dark-mode toggle */}
        <button
          type="button"
          id="theme-toggle"
          onClick={onToggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="
            w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
            bg-surface-ct dark:bg-dark-ct
            border border-outline-var dark:border-dark-ct-high
            text-on-surface-var dark:text-dark-on-muted
            hover:bg-surface-high dark:hover:bg-dark-ct-high
            hover:text-primary-ct dark:hover:text-primary-dim
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ct focus-visible:ring-offset-2
          "
        >
          {isDark ? (
            /* Sun icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            /* Moon icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export { MAX_FILE_SIZE }
export default Header
