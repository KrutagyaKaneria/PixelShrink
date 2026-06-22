const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

/**
 * Header accepts the dark-mode toggle so it can render the sun/moon button.
 */
function Header({ isDark, onToggleDark }) {
  return (
    <header className="w-full py-10 px-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">

        {/* Title block */}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-blue-500 text-4xl">⚡</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Image{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Compressor
              </span>
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Compress and convert images instantly, right in your browser.{" "}
            <span className="text-gray-700 dark:text-gray-300 font-medium">Nothing is uploaded.</span>
          </p>
        </div>

        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={onToggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="
            flex-shrink-0 ml-4
            w-9 h-9 rounded-full flex items-center justify-center
            bg-gray-800/60 dark:bg-gray-800/60 bg-gray-200
            text-gray-300 dark:text-gray-300 text-gray-600
            hover:bg-gray-700/60 dark:hover:bg-gray-700/60 hover:bg-gray-300
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
          "
        >
          {isDark ? (
            /* Sun — switch to light */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            /* Moon — switch to dark */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
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
