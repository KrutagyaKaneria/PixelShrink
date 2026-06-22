function Dropzone() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        className="
          border-2 border-dashed border-blue-500/50
          rounded-2xl
          bg-blue-950/20
          hover:bg-blue-950/40 hover:border-blue-400/80
          transition-all duration-300 cursor-pointer
          flex flex-col items-center justify-center
          gap-4 py-16 px-6 text-center
          group
        "
      >
        {/* Upload icon */}
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        {/* Text */}
        <div>
          <p className="text-white text-lg font-semibold mb-1">
            Drag &amp; drop images here, or click to browse
          </p>
          <p className="text-gray-500 text-sm">
            Supports JPEG, PNG, WebP · Max 10MB per file
          </p>
        </div>

        {/* Browse button (static, no handler yet) */}
        <button
          type="button"
          className="mt-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
        >
          Browse Files
        </button>
      </div>
    </div>
  )
}

export default Dropzone
