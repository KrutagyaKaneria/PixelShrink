import { useState, useEffect, useRef, useCallback } from 'react'
import { formatBytes } from '../hooks/useImageFiles'
import { compressImage, defaultFormatForFile } from '../lib/compressImage'
import FormatSelector from './FormatSelector'

/**
 * Computes the percentage size reduction (positive = smaller).
 * Returns null if compressed >= original.
 */
function savings(original, compressed) {
  const pct = ((original - compressed) / original) * 100
  return pct > 0 ? pct.toFixed(1) : null
}

function ImageCard({ entry, onRemove }) {
  const { id, file, previewUrl, size } = entry

  // ── Controls ────────────────────────────────────────────────────────────────
  const [quality, setQuality]   = useState(0.8)
  const [format, setFormat]     = useState(() => defaultFormatForFile(file))

  // ── Compression output ───────────────────────────────────────────────────
  const [compressed, setCompressed] = useState(null)
  // { objectUrl, size } | null

  const [status, setStatus] = useState('idle')
  // 'idle' | 'compressing' | 'done' | 'error'

  const [errorMsg, setErrorMsg] = useState('')

  // Track the latest object URL so we can revoke it before creating a new one
  const prevObjectUrl = useRef(null)

  // ── Run compression whenever quality or format changes ───────────────────
  const runCompression = useCallback(async () => {
    setStatus('compressing')
    setErrorMsg('')

    try {
      const result = await compressImage(file, quality, format)

      // Revoke the previous compressed URL to avoid memory leaks
      if (prevObjectUrl.current) {
        URL.revokeObjectURL(prevObjectUrl.current)
      }
      prevObjectUrl.current = result.objectUrl

      setCompressed({ objectUrl: result.objectUrl, size: result.size })
      setStatus('done')
    } catch (err) {
      setCompressed(null)
      setErrorMsg(err.message)
      setStatus('error')
    }
  }, [file, quality, format])

  useEffect(() => {
    runCompression()
  }, [runCompression])

  // Revoke compressed URL on unmount
  useEffect(() => {
    return () => {
      if (prevObjectUrl.current) {
        URL.revokeObjectURL(prevObjectUrl.current)
      }
    }
  }, [])

  // ── Download helper ───────────────────────────────────────────────────────
  const handleDownload = () => {
    if (!compressed) return
    const ext = format === 'jpg' ? 'jpg' : format
    const baseName = file.name.replace(/\.[^.]+$/, '')
    const a = document.createElement('a')
    a.href = compressed.objectUrl
    a.download = `${baseName}-compressed.${ext}`
    a.click()
  }

  // ── Derived display values ────────────────────────────────────────────────
  const savingsPct = compressed ? savings(size, compressed.size) : null
  const isSmaller  = savingsPct !== null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors duration-200 group">

      {/* ── Top row: thumbnail + file info + remove ── */}
      <div className="flex items-center gap-4 p-4 pb-3">

        {/* Thumbnails — original + compressed side by side */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-800 ring-1 ring-gray-700">
            <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          {compressed && (
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-800 ring-1 ring-blue-500/40">
              <img src={compressed.objectUrl} alt="Compressed preview" className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate" title={file.name}>
            {file.name}
          </p>

          {/* Size row */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1">
            <span className="text-gray-500 text-xs">{formatBytes(size)}</span>

            {status === 'compressing' && (
              <span className="text-blue-400 text-xs animate-pulse">Compressing…</span>
            )}

            {status === 'done' && compressed && (
              <>
                <span className="text-gray-600 text-xs">→</span>
                <span className={`text-xs font-medium ${isSmaller ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {formatBytes(compressed.size)}
                </span>
                {isSmaller && (
                  <span className="text-xs text-emerald-500">−{savingsPct}%</span>
                )}
                {!isSmaller && (
                  <span className="text-xs text-yellow-500/80">(no reduction)</span>
                )}
              </>
            )}

            {status === 'error' && (
              <span className="text-red-400 text-xs">⚠ {errorMsg}</span>
            )}
          </div>
        </div>

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${file.name}`}
          className="
            flex-shrink-0 w-7 h-7 rounded-full
            flex items-center justify-center
            text-gray-600 hover:text-white bg-transparent hover:bg-red-500/80
            transition-all duration-200
            opacity-0 group-hover:opacity-100 focus:opacity-100
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        >
          ✕
        </button>
      </div>

      {/* ── Controls row ── */}
      <div className="px-4 pb-4 flex flex-col gap-3">

        {/* Quality slider */}
        <div className="flex items-center gap-3">
          <label htmlFor={`quality-${id}`} className="text-gray-500 text-xs w-14 flex-shrink-0">
            Quality
          </label>
          <input
            id={`quality-${id}`}
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
          />
          <span className="text-gray-300 text-xs w-10 text-right tabular-nums flex-shrink-0">
            {Math.round(quality * 100)}%
          </span>
        </div>

        {/* Format + Download row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs w-14 flex-shrink-0">Format</span>
            <FormatSelector value={format} onChange={setFormat} />
          </div>

          {/* Download button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={!compressed || status === 'compressing'}
            className="
              px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-blue-600 hover:bg-blue-500
              disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed
              text-white transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
            "
          >
            ↓ Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
