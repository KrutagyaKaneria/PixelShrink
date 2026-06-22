function EmptyState() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-10 flex flex-col items-center gap-4 py-14 text-center">
      {/* Illustration */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-gray-800/60 dark:bg-gray-800/60 bg-gray-100 animate-pulse" />
        <svg
          className="relative w-9 h-9 text-gray-600 dark:text-gray-600 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A1.5 1.5 0 0022.5 18.75V5.25A1.5 1.5 0 0021 3.75H3A1.5 1.5 0 001.5 5.25v13.5A1.5 1.5 0 003 20.25z"
          />
        </svg>
      </div>

      <div>
        <p className="text-gray-300 dark:text-gray-300 text-gray-700 text-base font-medium mb-1">
          No images yet
        </p>
        <p className="text-gray-600 dark:text-gray-600 text-gray-400 text-sm">
          Drag some in above, or click <span className="text-blue-400 font-medium">Browse Files</span> to get started.
        </p>
      </div>

      {/* Decorative tip */}
      <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/30 dark:bg-blue-950/30 bg-blue-50 border border-blue-500/20 dark:border-blue-500/20 border-blue-200">
        <span className="text-blue-400 text-sm">💡</span>
        <p className="text-gray-500 dark:text-gray-500 text-gray-600 text-xs">
          All compression happens locally — your images never leave this tab.
        </p>
      </div>
    </div>
  )
}

export default EmptyState
