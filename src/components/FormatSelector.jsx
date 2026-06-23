/**
 * FormatSelector — segmented pill control matching Stitch design:
 *   Recessed container with sliding active "pill" highlight
 */
const FORMATS = [
  { key: 'jpg',  label: 'JPG'  },
  { key: 'png',  label: 'PNG'  },
  { key: 'webp', label: 'WebP' },
]

function FormatSelector({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Output format"
      className="
        inline-flex items-center gap-0.5 p-0.5 rounded-lg
        bg-surface-ct dark:bg-dark-ct
        border border-outline-var dark:border-dark-ct-high
      "
    >
      {FORMATS.map(({ key, label }) => {
        const isActive = value === key
        return (
          <button
            key={key}
            type="button"
            id={`format-${key}`}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`
              px-2.5 py-1 rounded-md text-xs font-geist font-semibold
              transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ct
              ${isActive
                ? 'bg-primary-ct text-white shadow-sm'
                : 'text-on-surface-var dark:text-dark-on-muted hover:text-on-surface dark:hover:text-dark-on hover:bg-surface-high dark:hover:bg-dark-ct-high'
              }
            `}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default FormatSelector
