import { formatBytes } from '../hooks/useImageFiles'

function ImageCard({ entry, onRemove }) {
  const { id, file, previewUrl, size } = entry

  return (
    <div
      className="
        relative flex items-center gap-4
        bg-gray-900 border border-gray-800 rounded-xl
        p-3 pr-4
        hover:border-gray-700 transition-colors duration-200
        group
      "
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
        <img
          src={previewUrl}
          alt={file.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-white text-sm font-medium truncate"
          title={file.name}
        >
          {file.name}
        </p>
        <p className="text-gray-500 text-xs mt-0.5">
          {formatBytes(size)}
        </p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${file.name}`}
        className="
          flex-shrink-0
          w-7 h-7 rounded-full
          flex items-center justify-center
          text-gray-600 hover:text-white
          bg-transparent hover:bg-red-500/80
          transition-all duration-200
          opacity-0 group-hover:opacity-100
          focus:opacity-100
          focus:outline-none focus:ring-2 focus:ring-red-400
        "
      >
        ✕
      </button>
    </div>
  )
}

export default ImageCard
