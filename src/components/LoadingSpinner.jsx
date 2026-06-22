/**
 * A reusable animated spinner.
 *
 * Props:
 *   size      — 'sm' (16px) | 'md' (24px) | 'lg' (32px), default 'md'
 *   className — extra Tailwind classes (e.g. text-blue-400)
 */
function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClass = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }[size] ?? 'w-6 h-6'

  return (
    <svg
      className={`animate-spin ${sizeClass} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-20"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  )
}

export default LoadingSpinner
