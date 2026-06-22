import { useState, useCallback } from 'react'
import Header from './components/Header'
import Dropzone from './components/Dropzone'
import ImageCard from './components/ImageCard'
import EmptyState from './components/EmptyState'
import DownloadAllButton from './components/DownloadAllButton'
import Footer from './components/Footer'
import { useImageFiles } from './hooks/useImageFiles'

function App() {
  // Dark mode — default to dark (the app's designed palette)
  const [isDark, setIsDark] = useState(true)

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

  return (
    // `dark` class applied here drives all dark: Tailwind variants below
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center transition-colors duration-300`}>

      <main className="flex flex-col items-center w-full flex-1 max-w-3xl px-4 sm:px-6 pb-12">

        <Header isDark={isDark} onToggleDark={() => setIsDark((d) => !d)} />

        <div className="w-full max-w-2xl border-t border-gray-200 dark:border-gray-800/60 mb-8 sm:mb-10" />

        <Dropzone onAddFiles={addFiles} />

        {/* Empty state */}
        {files.length === 0 && <EmptyState />}

        {/* File list */}
        {files.length > 0 && (
          <section className="w-full max-w-2xl mt-8 px-2 sm:px-4">

            {/* List header */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {files.length} {files.length === 1 ? 'Image' : 'Images'}
              </h2>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
                {files.length > 1 && (
                  <DownloadAllButton outputs={readyOutputs} total={files.length} />
                )}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-gray-500 dark:text-gray-600 hover:text-red-400 transition-colors duration-200 whitespace-nowrap"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Cards */}
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
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
