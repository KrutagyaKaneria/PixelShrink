import { useState } from 'react'
import { downloadAsZip } from '../lib/zipUtils'

/**
 * Triggers a ZIP download of all currently compressed images.
 *
 * Props:
 *   outputs — array of { filename: string, blob: Blob } (ready outputs only)
 *   total   — total number of uploaded files (to show pending count)
 */
function DownloadAllButton({ outputs, total }) {
  const [zipping, setZipping] = useState(false)
  const readyCount = outputs.length
  const pendingCount = total - readyCount
  const disabled = readyCount === 0 || zipping

  const handleClick = async () => {
    if (disabled) return
    setZipping(true)
    try {
      await downloadAsZip(outputs)
    } finally {
      setZipping(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={
        readyCount === 0
          ? 'No compressed images ready yet'
          : `Download ${readyCount} image${readyCount !== 1 ? 's' : ''} as ZIP`
      }
      className={`
        flex items-center gap-2
        px-4 py-2 rounded-xl text-sm font-semibold
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        ${
          disabled
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-100'
        }
      `}
    >
      {/* Icon */}
      {zipping ? (
        <svg className="w-4 h-4 animate-spin flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      )}

      {/* Label */}
      <span>
        {zipping
          ? 'Zipping…'
          : `Download All as ZIP (${readyCount})`}
      </span>

      {/* Pending badge */}
      {pendingCount > 0 && !zipping && (
        <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
          {pendingCount} pending
        </span>
      )}
    </button>
  )
}

export default DownloadAllButton
