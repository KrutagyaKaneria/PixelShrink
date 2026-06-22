const FORMATS = [
  { key: 'jpg',  label: 'JPG' },
  { key: 'png',  label: 'PNG' },
  { key: 'webp', label: 'WebP' },
]

/**
 * A three-button pill selector for output format.
 *
 * Props:
 *   value    — 'jpg' | 'png' | 'webp' (controlled)
 *   onChange — (formatKey: string) => void
 */
function FormatSelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Output format">
      {FORMATS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={value === key}
          className={`
            px-2.5 py-1 rounded-md text-xs font-semibold
            transition-all duration-150
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
            ${
              value === key
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FormatSelector
