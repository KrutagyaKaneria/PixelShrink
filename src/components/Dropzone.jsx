import { useRef, useState, useCallback } from 'react'

const MAX_FILE_BYTES = 20 * 1024 * 1024 // 20 MB

/**
 * Dropzone — matches Stitch design:
 *   - Dashed border (indigo/outline-var), large centered zone
 *   - Upload icon in indigo container
 *   - "Drag & drop images here" + "or click to browse" text
 *   - Supported formats: PNG, JPG, WEBP listed below
 *   - Compact inline version (with "Add more images") when hasFiles=true
 */
function Dropzone({ onAddFiles, hasFiles = false }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const [error, setError]     = useState('')
  const [warning, setWarning] = useState('')

  const clearMessages = () => { setError(''); setWarning('') }

  const show = useCallback((type, msg) => {
    if (type === 'error')   { setError(msg);   setTimeout(() => setError(''), 4000) }
    if (type === 'warning') { setWarning(msg); setTimeout(() => setWarning(''), 5000) }
  }, [])

  const handleFiles = useCallback(
    (incoming) => {
      clearMessages()
      const arr = Array.from(incoming)
      if (arr.length === 0) return

      const images    = arr.filter((f) => f.type.startsWith('image/'))
      const nonImages = arr.length - images.length

      if (images.length === 0) {
        show('error', 'Only image files (JPEG, PNG, WebP, …) are supported.')
        return
      }
      if (nonImages > 0) {
        show('error', `${nonImages} non-image file${nonImages > 1 ? 's were' : ' was'} skipped.`)
      }

      const oversized = images.filter((f) => f.size > MAX_FILE_BYTES)
      if (oversized.length > 0) {
        show(
          'warning',
          oversized.length === 1
            ? `"${oversized[0].name}" is over 20 MB — compression may be slow.`
            : `${oversized.length} files are over 20 MB — compression may be slow.`
        )
      }

      onAddFiles(images)
    },
    [onAddFiles, show]
  )

  const onDragOver  = useCallback((e) => { e.preventDefault(); setIsDragging(true) }, [])
  const onDragLeave = useCallback((e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false) }, [])
  const onDrop      = useCallback((e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }, [handleFiles])
  const onInputChange = useCallback((e) => { handleFiles(e.target.files); e.target.value = '' }, [handleFiles])

  // ── Compact "Add more images" bar (shown when files exist) ──────────────
  if (hasFiles) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onInputChange} id="file-input-more" />

        <div
          role="button"
          tabIndex={0}
          aria-label="Add more images"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`
            flex items-center gap-3 w-full px-4 py-3 rounded-xl cursor-pointer select-none
            border border-dashed transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ct
            ${isDragging
              ? 'border-primary-ct bg-primary-fixed/30 dark:bg-primary-ct/10'
              : 'border-outline-var dark:border-dark-ct bg-surface-low dark:bg-dark-surface hover:bg-surface-ct dark:hover:bg-dark-ct hover:border-primary-ct/50'
            }
          `}
        >
          <div className="w-7 h-7 rounded-md bg-primary-fixed dark:bg-dark-ct flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-primary-ct dark:text-primary-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="font-geist font-medium text-sm text-on-surface-var dark:text-dark-on-muted">
            Add more images
          </span>
          <span className="ml-auto text-xs text-on-surface-var/60 dark:text-dark-on-muted/60 hidden sm:block">
            Drag and drop or click to upload
          </span>
        </div>

        {error && <MessageBanner type="error" msg={error} />}
        {warning && <MessageBanner type="warning" msg={warning} />}
      </div>
    )
  }

  // ── Full dropzone (empty state) ──────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onInputChange} id="file-input" />

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
          relative border-2 border-dashed rounded-2xl
          flex flex-col items-center justify-center
          gap-4 py-14 sm:py-16 px-6 text-center
          cursor-pointer select-none
          transition-all duration-300 group
          outline-none focus-visible:ring-2 focus-visible:ring-primary-ct focus-visible:ring-offset-2
          ${isDragging
            ? 'border-primary-ct bg-primary-fixed/20 dark:bg-primary-ct/10 scale-[1.01]'
            : 'border-outline-var dark:border-dark-ct bg-surface-low dark:bg-dark-surface hover:border-primary-ct/60 hover:bg-primary-fixed/10 dark:hover:bg-primary-ct/5'
          }
        `}
      >
        {/* Upload icon */}
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${isDragging
            ? 'bg-primary-ct scale-110'
            : 'bg-primary-fixed dark:bg-dark-ct group-hover:bg-primary-ct/20 dark:group-hover:bg-primary-ct/20'
          }
        `}>
          <svg
            className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-white' : 'text-primary-ct dark:text-primary-dim'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <p className="font-geist font-semibold text-lg sm:text-xl text-on-surface dark:text-dark-on mb-1">
            {isDragging ? 'Release to upload' : 'Drag & drop images here'}
          </p>
          <p className="text-on-surface-var dark:text-dark-on-muted text-sm">
            or click to browse
          </p>
        </div>

        {/* Supported formats chips */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {['PNG', 'JPG', 'WEBP'].map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 rounded-md text-xs font-geist font-semibold
                bg-surface-ct dark:bg-dark-ct
                text-on-surface-var dark:text-dark-on-muted
                border border-outline-var dark:border-dark-ct-high"
            >
              {fmt}
            </span>
          ))}
          <span className="text-xs text-on-surface-var/60 dark:text-dark-on-muted/60 ml-1">
            · up to 20 MB
          </span>
        </div>
      </div>

      {error && <MessageBanner type="error" msg={error} />}
      {warning && <MessageBanner type="warning" msg={warning} />}
    </div>
  )
}

function MessageBanner({ type, msg }) {
  const isError = type === 'error'
  return (
    <div className={`mt-3 flex items-start gap-2 px-3 py-2 rounded-lg text-sm
      ${isError
        ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400'
        : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400'
      }`}
    >
      <span className="flex-shrink-0 mt-0.5">{isError ? '⚠' : '⚡'}</span>
      <p>{msg}</p>
    </div>
  )
}

export default Dropzone
