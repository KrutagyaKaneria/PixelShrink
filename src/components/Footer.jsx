/**
 * Footer — matches Stitch design exactly:
 *   Left: PixelShrink wordmark + "Built for Digital Heroes © 2024" + Privacy/Terms/GitHub links
 *   Right: "Built for Digital Heroes" CTA button → https://digitalheroesco.com
 *   Mobile: stacks vertically, button becomes full-width
 */
function Footer() {
  return (
    <footer className="
      w-full mt-auto
      border-t border-outline-var dark:border-dark-ct
      bg-surface dark:bg-dark-bg
      transition-colors duration-300
    ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-2">
            {/* Wordmark */}
            <span className="font-geist font-semibold text-sm text-on-surface dark:text-dark-on tracking-tight">
              PixelShrink
            </span>

            {/* Tagline + copyright + Developer info */}
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-on-surface-var dark:text-dark-on-muted">
              <span>Built for Digital Heroes © {new Date().getFullYear()}</span>
              <span className="hidden sm:inline text-on-surface-var/40 dark:text-dark-on-muted/40">•</span>
              <span>Developer: <span className="font-semibold text-on-surface dark:text-dark-on">Krutagya Kaneria</span></span>
              <span className="hidden sm:inline text-on-surface-var/40 dark:text-dark-on-muted/40">•</span>
              <a
                href="mailto:krutagya.kaneria.cg@gmail.com"
                className="text-primary-ct dark:text-primary-dim hover:underline"
              >
                krutagya.kaneria.cg@gmail.com
              </a>
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-4 mt-0.5">
              {[
                { label: 'Privacy', href: '#' },
                { label: 'Terms',   href: '#' },
                { label: 'GitHub',  href: 'https://github.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="
                    text-xs text-on-surface-var dark:text-dark-on-muted
                    hover:text-primary-ct dark:hover:text-primary-dim
                    transition-colors duration-150
                  "
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — CTA Button */}
          <a
            id="built-for-digital-heroes-btn"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              w-full sm:w-auto
              px-5 py-2.5 rounded-xl
              bg-primary-ct hover:bg-primary
              text-white font-geist font-semibold text-sm
              shadow-sm hover:shadow-ambient-lg
              hover:scale-[1.02] active:scale-100
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-ct focus-visible:ring-offset-2
            "
          >
            {/* Small lightning icon */}
            <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Built for Digital Heroes
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
