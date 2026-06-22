import { useState, useCallback } from 'react'
import Header from './components/Header'
import Dropzone from './components/Dropzone'
import ImageCard from './components/ImageCard'
import DownloadAllButton from './components/DownloadAllButton'
import Footer from './components/Footer'
import { useImageFiles } from './hooks/useImageFiles'

function App() {
  const { files, addFiles, removeFile } = useImageFiles()

  /**
   * Map of fileId → { blob, filename } for all cards that have finished
   * compression. Cleared when the file is removed.
   * Shape: { [id]: { blob: Blob, filename: string } | null }
   */
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

  // Only pass ready (non-null) outputs to DownloadAllButton
  const readyOutputs = Object.values(compressedOutputs).filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">

      <main className="flex flex-col items-center w-full flex-1 max-w-3xl px-4 sm:px-6 pb-12">
        <Header />

        <div className="w-full max-w-2xl border-t border-gray-800/60 mb-10" />

        <Dropzone onAddFiles={addFiles} />

        {files.length > 0 && (
          <section className="w-full max-w-2xl mt-8 px-4">

            {/* List header row */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {files.length} {files.length === 1 ? 'Image' : 'Images'}
              </h2>

              <div className="flex items-center gap-3">
                {/* Download All — only shown for 2+ images */}
                {files.length > 1 && (
                  <DownloadAllButton
                    outputs={readyOutputs}
                    total={files.length}
                  />
                )}

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-gray-600 hover:text-red-400 transition-colors duration-200"
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
