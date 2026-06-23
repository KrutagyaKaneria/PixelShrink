import { useState, useEffect, useRef, useCallback } from 'react'
import { formatBytes } from '../hooks/useImageFiles'
import { compressImage, defaultFormatForFile } from '../lib/compressImage'
import FormatSelector from './FormatSelector'
import DownloadButton from './DownloadButton'
import LoadingSpinner from './LoadingSpinner'

function savings(original, compressed) {
  const pct = ((original - compressed) / original) * 100
  return pct > 0 ? pct.toFixed(1) : null
}

function buildFilename(originalName, format) {
  const base = originalName.replace(/\.[^.]+$/, '')
  return `${base}-compressed.${format}`
}

/**
 * ImageCard — matches Stitch "Uploaded State" and "Mobile View" screens:
 *   - Thumbnail + filename + size row
 *   - Original → compressed size with green percentage badge
 *   - Quality slider (custom styled)
 *   - Format segmented control
 *   - Processing badge overlay when compressing
 *   - Hover-reveal remove button (top-right)
 */
function ImageCard({ entry, onRemove, onCompressed }) {
  const { id, file, previewUrl, size } = entry

  const [quality, setQuality] = useState(0.8)
  const [format, setFormat]   = useState(() => defaultFormatForFile(file))

  const [compressed, setCompressed] = useState(null)
  const [status, setStatus]         = useState('idle')
  const [errorMsg, setErrorMsg]     = useState('')

  const prevObjectUrl = useRef(null)

  const runCompression = useCallback(async () => {
    setStatus('compressing')
    setErrorMsg('')
    try {
      const result = await compressImage(file, quality, format)
      if (prevObjectUrl.current) URL.revokeObjectURL(prevObjectUrl.current)
      prevObjectUrl.current = result.objectUrl
      setCompressed({ objectUrl: result.objectUrl, blob: result.blob, size: result.size })
      setStatus('done')
      onCompressed?.(id, { blob: result.blob, filename: buildFilename(file.name, format) })
    } catch (err) {
      setCompressed(null)
      setErrorMsg(err.message)
      setStatus('error')
      onCompressed?.(id, null)
    }
  }, [file, quality, format, id, onCompressed])

  useEffect(() => { runCompression() }, [runCompression])

  useEffect(() => {
    return () => { if (prevObjectUrl.current) URL.revokeObjectURL(prevObjectUrl.current) }
  }, [])

  const isCompressing = status === 'compressing'
  const savingsPct    = compressed ? savings(size, compressed.size) : null
  const isSmaller     = savingsPct !== null
  const outputFilename = buildFilename(file.name, format)

  return (
    <div className="
      relative
      bg-surface-lowest dark:bg-dark-surface
      border border-outline-var dark:border-dark-ct
      rounded-xl overflow-hidden
      hover:border-on-surface-var/30 dark:hover:border-dark-ct-high
      shadow-ambient hover:shadow-ambient-lg
      transition-all duration-200 group
    ">

      {/* Processing badge — top-right overlay */}
      {isCompressing && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full
          bg-primary-ct text-white text-xs font-geist font-semibold shadow-sm">
          <LoadingSpinner size="xs" className="text-white/80" />
          Processing…
        </div>
      )}

      {/* ── Top row — thumbnail + info + remove ── */}
      <div className="flex items-start gap-3 p-4 pb-3">

        {/* Thumbnail */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-surface-ct dark:bg-dark-ct ring-1 ring-outline-var dark:ring-dark-ct-high">
            <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Compressed preview — stacked below on mobile, right-side on sm+ */}
          {compressed && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md overflow-hidden ring-2 ring-surface-lowest dark:ring-dark-surface sm:hidden">
              <img src={compressed.objectUrl} alt="Compressed" className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
        </div>

        {/* Compressed preview — sm+ */}
        {compressed && (
          <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-primary-ct/40 dark:ring-primary-ct/30">
            <img src={compressed.objectUrl} alt="Compressed" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        {/* Spinner placeholder while compressing — sm+ */}
        {isCompressing && (
          <div className="hidden sm:flex w-16 h-16 rounded-lg flex-shrink-0 ring-1 ring-primary-ct/20 bg-surface-ct dark:bg-dark-ct items-center justify-center">
            <LoadingSpinner size="sm" className="text-primary-ct dark:text-primary-dim" />
          </div>
        )}

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="font-geist font-semibold text-sm text-on-surface dark:text-dark-on truncate" title={file.name}>
            {file.name}
          </p>

          {/* Size row */}
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 mt-1">
            <span className="text-xs text-on-surface-var dark:text-dark-on-muted">{formatBytes(size)}</span>

            {isCompressing && (
              <span className="text-xs text-primary-ct dark:text-primary-dim animate-pulse">Compressing…</span>
            )}

            {status === 'done' && compressed && (
              <>
                <span className="text-xs text-on-surface-var/50 dark:text-dark-on-muted/50">→</span>
                <span className={`text-xs font-semibold ${isSmaller ? 'text-success' : 'text-amber-600 dark:text-amber-400'}`}>
                  {formatBytes(compressed.size)}
                </span>
                {isSmaller && (
                  <span className="
                    inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-geist font-semibold
                    bg-success-light dark:bg-success/20
                    text-success dark:text-emerald-400
                  ">
                    −{savingsPct}%
                  </span>
                )}
                {!isSmaller && (
                  <span className="text-xs text-amber-500/70 dark:text-amber-400/70">(no reduction)</span>
                )}
              </>
            )}

            {status === 'error' && (
              <span className="text-xs text-red-500 dark:text-red-400">⚠ {errorMsg}</span>
            )}
          </div>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${file.name}`}
          className="
            flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
            text-on-surface-var/40 dark:text-dark-on-muted/40
            hover:text-red-500 dark:hover:text-red-400
            hover:bg-red-50 dark:hover:bg-red-950/30
            opacity-0 group-hover:opacity-100 focus:opacity-100
            transition-all duration-150 ml-1
            focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
          "
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="mx-4 border-t border-outline-var/50 dark:border-dark-ct" />

      {/* ── Controls ── */}
      <div className="px-4 py-3 flex flex-col gap-3">

        {/* Quality slider row */}
        <div className="flex items-center gap-3">
          <label
            htmlFor={`quality-${id}`}
            className="font-geist text-xs font-medium text-on-surface-var dark:text-dark-on-muted w-12 flex-shrink-0"
          >
            Quality
          </label>
          <input
            id={`quality-${id}`}
            type="range"
            min={0.05} max={1} step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="quality-slider flex-1 min-w-0"
          />
          <span className="font-geist text-xs font-semibold text-on-surface dark:text-dark-on w-8 text-right tabular-nums flex-shrink-0">
            {Math.round(quality * 100)}%
          </span>
        </div>

        {/* Format + Download row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-geist text-xs font-medium text-on-surface-var dark:text-dark-on-muted w-12 flex-shrink-0">
              Format
            </span>
            <FormatSelector value={format} onChange={setFormat} />
          </div>

          <DownloadButton
            blob={compressed?.blob ?? null}
            filename={outputFilename}
            loading={isCompressing}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageCard
