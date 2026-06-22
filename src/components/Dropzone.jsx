import { useRef, useState, useCallback } from 'react'

const MAX_FILE_BYTES = 20 * 1024 * 1024 // 20 MB

function Dropzone({ onAddFiles }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  // Separate states for different message types so they can coexist
  const [error, setError]     = useState('')  // non-image rejection
  const [warning, setWarning] = useState('')  // oversized but allowed

  const clearMessages = () => { setError(''); setWarning('') }

  const show = useCallback((type, msg) => {
    if (type === 'error')   { setError(msg);   setTimeout(() => setError(''), 4000) }
    if (type === 'warning') { setWarning(msg); setTimeout(() => setWarning(''), 5000) }
  }, [])

  // ── File validation + handoff ──────────────────────────────────────────────

  const handleFiles = useCallback(
    (incoming) => {
      clearMessages()
      const arr = Array.from(incoming)
      if (arr.length === 0) return

      // 1. Split images vs non-images
      const images    = arr.filter((f) => f.type.startsWith('image/'))
      const nonImages = arr.length - images.length

      if (images.length === 0) {
        show('error', 'Only image files (JPEG, PNG, WebP, …) are supported.')
        return
      }
      if (nonImages > 0) {
        show('error', `${nonImages} non-image file${nonImages > 1 ? 's were' : ' was'} skipped.`)
      }

      // 2. Warn about oversized files but still pass them through
      const oversized = images.filter((f) => f.size > MAX_FILE_BYTES)
      if (oversized.length > 0) {
        const names = oversized.map((f) => f.name).join(', ')
        show(
          'warning',
          oversized.length === 1
            ? `"${oversized[0].name}" is over 20 MB — compression may be slow.`
            : `${oversized.length} files are over 20 MB (${names}) — compression may be slow.`
        )
      }

      // All images are passed through (no hard block on size)
      onAddFiles(images)
    },
    [onAddFiles, show]
  )

  // ── Drag-and-drop handlers ─────────────────────────────────────────────────

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false)
  }, [])

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  // ── File-picker handler ────────────────────────────────────────────────────

  const onInputChange = useCallback(
    (e) => {
      handleFiles(e.target.files)
      e.target.value = ''
    },
    [handleFiles]
  )

  // ── Render ─────────────────────────────────────────────────────────────────

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
          gap-4 py-12 sm:py-14 px-4 sm:px-6 text-center
          cursor-pointer select-none
          transition-all duration-300 group
          outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          ${isDragging
            ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
            : 'border-blue-500/40 bg-blue-950/20 dark:bg-blue-950/20 bg-blue-50/80 hover:bg-blue-950/40 dark:hover:bg-blue-950/40 hover:bg-blue-100/80 hover:border-blue-400/70'
          }
        `}
      >
        {/* Upload icon */}
        <div className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
          transition-transform duration-300
          ${isDragging ? 'scale-125 bg-blue-500/20' : 'bg-blue-500/10 group-hover:scale-110'}
        `}>
          <svg
            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${isDragging ? 'text-blue-300' : 'text-blue-400'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        {/* Label */}
        <div>
          <p className="text-gray-900 dark:text-white text-base sm:text-lg font-semibold mb-1">
            {isDragging ? 'Release to upload' : 'Drag & drop images here, or click to browse'}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
            Supports JPEG, PNG, WebP, GIF · Max recommended 20 MB
          </p>
        </div>

        <span className="mt-1 px-4 sm:px-5 py-2 rounded-lg bg-blue-600 group-hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200 pointer-events-none">
          Browse Files
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="text-red-400 mt-0.5 flex-shrink-0">⚠</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Warning message (oversized — allowed but flagged) */}
      {warning && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <span className="text-yellow-400 mt-0.5 flex-shrink-0">⚡</span>
          <p className="text-yellow-400 text-sm">{warning}</p>
        </div>
      )}
    </div>
  )
}

export default Dropzone
