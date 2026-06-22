import { useRef, useState, useCallback } from 'react'

function Dropzone({ onAddFiles }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')

  // ── helpers ─────────────────────────────────────────────────────────────────

  const showError = useCallback((msg) => {
    setError(msg)
    setTimeout(() => setError(''), 3500)
  }, [])

  const handleFiles = useCallback(
    (incoming) => {
      const arr = Array.from(incoming)
      if (arr.length === 0) return

      const rejected = onAddFiles(arr)
      if (rejected > 0) {
        showError(
          rejected === arr.length
            ? 'Only image files (JPEG, PNG, WebP, …) are supported.'
            : `${rejected} non-image file${rejected > 1 ? 's were' : ' was'} skipped.`
        )
      }
    },
    [onAddFiles, showError]
  )

  // ── drag-and-drop handlers ───────────────────────────────────────────────────

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    // Only clear when leaving the dropzone itself, not a child element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }, [])

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  // ── file-picker handler ──────────────────────────────────────────────────────

  const onInputChange = useCallback(
    (e) => {
      handleFiles(e.target.files)
      // Reset input so the same file can be re-added after removal
      e.target.value = ''
    },
    [handleFiles]
  )

  // ── render ───────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onInputChange}
        id="file-input"
      />

      {/* Drop target */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          border-2 border-dashed rounded-2xl
          flex flex-col items-center justify-center
          gap-4 py-14 px-6 text-center
          cursor-pointer select-none
          transition-all duration-300 group
          outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          ${
            isDragging
              ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
              : 'border-blue-500/40 bg-blue-950/20 hover:bg-blue-950/40 hover:border-blue-400/70'
          }
        `}
      >
        {/* Upload icon */}
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            transition-transform duration-300
            ${isDragging ? 'scale-125 bg-blue-500/20' : 'bg-blue-500/10 group-hover:scale-110'}
          `}
        >
          <svg
            className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-blue-300' : 'text-blue-400'}`}
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

        {/* Label text */}
        <div>
          <p className="text-white text-lg font-semibold mb-1">
            {isDragging ? 'Release to upload' : 'Drag & drop images here, or click to browse'}
          </p>
          <p className="text-gray-500 text-sm">
            Supports JPEG, PNG, WebP, GIF · Multiple files OK
          </p>
        </div>

        {/* Browse button — purely decorative (click bubbles to wrapper) */}
        <span className="mt-1 px-5 py-2 rounded-lg bg-blue-600 group-hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200 pointer-events-none">
          Browse Files
        </span>
      </div>

      {/* Inline error message */}
      {error && (
        <p className="mt-3 text-center text-sm text-red-400 animate-pulse">
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

export default Dropzone
