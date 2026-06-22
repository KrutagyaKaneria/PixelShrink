import { saveAs } from 'file-saver'

/**
 * Downloads a single compressed image using file-saver.
 *
 * Props:
 *   blob      — Blob of the compressed output (null while compressing)
 *   filename  — e.g. "photo-compressed.webp"
 *   loading   — bool, true while compression is in progress
 */
function DownloadButton({ blob, filename, loading }) {
  const disabled = !blob || loading

  const handleClick = () => {
    if (disabled) return
    saveAs(blob, filename)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={disabled ? 'Waiting for compression…' : `Download ${filename}`}
      className={`
        flex items-center gap-1.5
        px-3 py-1.5 rounded-lg text-xs font-semibold
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
        ${
          disabled
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 hover:shadow-blue-500/30'
        }
      `}
    >
      {loading ? (
        /* Spinner */
        <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        /* Download icon */
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      )}
      {loading ? 'Compressing…' : 'Download'}
    </button>
  )
}

export default DownloadButton
