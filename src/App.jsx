import { useState, useCallback, useMemo, useEffect } from 'react'
import Header from './components/Header'
import Dropzone from './components/Dropzone'
import ImageCard from './components/ImageCard'
import EmptyState from './components/EmptyState'
import DownloadAllButton from './components/DownloadAllButton'
import Footer from './components/Footer'
import { useImageFiles, formatBytes } from './hooks/useImageFiles'

function App() {
  // Default to light mode to match Stitch "Empty State" reference
  const [isDark, setIsDark] = useState(false)

  // Apply dark class to <html> so all Tailwind dark: variants work globally
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.backgroundColor = '#18181b'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.backgroundColor = '#fbf8ff'
    }
  }, [isDark])

  const { files, addFiles, removeFile } = useImageFiles()
  const [compressedOutputs, setCompressedOutputs] = useState({})

  const handleCompressed = useCallback((id, output) => {
    setCompressedOutputs((prev) => ({ ...prev, [id]: output }))
  }, [])

  const handleRemove = useCallback((id) => {
    removeFile(id)
    setCompressedOutputs((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [removeFile])

  const handleClearAll = useCallback(() => {
    files.forEach((f) => removeFile(f.id))
    setCompressedOutputs({})
  }, [files, removeFile])

  const readyOutputs = Object.values(compressedOutputs).filter(Boolean)

  // ── Summary stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const entries = files.map((f) => ({
      original: f.size,
      compressed: compressedOutputs[f.id]?.blob?.size ?? null,
    }))
    const done = entries.filter((e) => e.compressed !== null)
    if (done.length === 0) return null

    const totalSaved = done.reduce((acc, e) => acc + Math.max(0, e.original - e.compressed), 0)
    const avgReduction =
      done.reduce((acc, e) => acc + ((e.original - e.compressed) / e.original) * 100, 0) /
      done.length

    return {
      totalSaved: formatBytes(Math.max(0, totalSaved)),
      avgReduction: avgReduction > 0 ? avgReduction.toFixed(1) : '0.0',
      count: done.length,
    }
  }, [files, compressedOutputs])

  const hasFiles = files.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-dark-bg transition-colors duration-300">

      {/* ── Header ── */}
      <Header isDark={isDark} onToggleDark={() => setIsDark((d) => !d)} />

      {/* ── Main content ── */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">

          {/* ── Hero section (empty state) ── */}
          {!hasFiles && (
            <section className="flex flex-col items-center gap-2 text-center pt-6 sm:pt-10 pb-4">
              {/* Page title */}
              <h1 className="font-geist font-semibold text-2xl sm:text-3xl text-on-surface dark:text-dark-on tracking-tight">
                Compress &amp; convert images instantly
              </h1>
              <p className="text-on-surface-var dark:text-dark-on-muted text-sm sm:text-base max-w-md">
                100% in your browser — nothing ever uploaded to a server.
              </p>
            </section>
          )}

          {/* ── Dropzone (full when empty, compact "Add more" bar when files exist) ── */}
          <Dropzone onAddFiles={addFiles} hasFiles={hasFiles} />

          {/* ── Trust badges (only in empty state) ── */}
          {!hasFiles && <EmptyState />}

          {/* ── Optimization Queue (uploaded state) ── */}
          {hasFiles && (
            <section className="w-full flex flex-col gap-4">

              {/* Section header */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-geist font-semibold text-base text-on-surface dark:text-dark-on">
                    Optimization Queue
                  </h2>
                  <p className="text-xs text-on-surface-var dark:text-dark-on-muted mt-0.5">
                    Adjust settings per file or download all at once.
                  </p>
                </div>

                {/* Desktop Download All (top-right, appears alongside header) */}
                <div className="hidden sm:flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs text-on-surface-var dark:text-dark-on-muted hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
                  >
                    Clear all
                  </button>
                  {files.length > 1 && (
                    <DownloadAllButton outputs={readyOutputs} total={files.length} />
                  )}
                </div>
              </div>

              {/* Image cards */}
              <div className="flex flex-col gap-3">
                {files.map((entry) => (
                  <ImageCard
                    key={entry.id}
                    entry={entry}
                    onRemove={handleRemove}
                    onCompressed={handleCompressed}
                  />
                ))}
              </div>

              {/* ── Bottom summary bar ── */}
              {stats && (
                <div className="
                  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                  px-4 sm:px-5 py-4 rounded-xl
                  bg-surface-ct dark:bg-dark-ct
                  border border-outline-var dark:border-dark-ct-high
                ">
                  {/* Stats */}
                  <div className="flex items-center gap-5 sm:gap-8 flex-wrap">
                    <Stat
                      label="Total Saved"
                      value={stats.totalSaved}
                      highlight={true}
                    />
                    <Stat
                      label="Average Reduction"
                      value={`${stats.avgReduction}%`}
                      highlight={true}
                    />
                    <Stat
                      label="Files Ready"
                      value={`${stats.count} / ${files.length}`}
                      highlight={false}
                    />
                  </div>

                  {/* Download All — full-width on mobile */}
                  <div className="sm:flex-shrink-0">
                    {files.length > 1 ? (
                      <DownloadAllButton outputs={readyOutputs} total={files.length} fullWidth />
                    ) : (
                      readyOutputs.length === 1 && (
                        <div className="text-xs text-on-surface-var dark:text-dark-on-muted text-center sm:text-right">
                          Use the Download button on the card above
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Mobile: Clear all + Download All sticky-ish row */}
              <div className="flex sm:hidden items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-on-surface-var dark:text-dark-on-muted hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
                >
                  Clear all
                </button>
                {files.length > 1 && (
                  <DownloadAllButton outputs={readyOutputs} total={files.length} fullWidth />
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}

/** Small stat display for the summary bar */
function Stat({ label, value, highlight }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-geist font-medium text-on-surface-var dark:text-dark-on-muted uppercase tracking-wider">
        {label}
      </span>
      <span className={`font-geist font-semibold text-base ${highlight ? 'text-success dark:text-emerald-400' : 'text-on-surface dark:text-dark-on'}`}>
        {value}
      </span>
    </div>
  )
}

export default App
