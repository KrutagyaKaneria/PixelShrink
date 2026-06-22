import Header from './components/Header'
import Dropzone from './components/Dropzone'
import ImageCard from './components/ImageCard'
import Footer from './components/Footer'
import { useImageFiles } from './hooks/useImageFiles'

function App() {
  const { files, addFiles, removeFile } = useImageFiles()

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">

      <main className="flex flex-col items-center w-full flex-1 max-w-3xl px-4 sm:px-6 pb-12">
        <Header />

        <div className="w-full max-w-2xl border-t border-gray-800/60 mb-10" />

        {/* Dropzone — passes addFiles down */}
        <Dropzone onAddFiles={addFiles} />

        {/* File list */}
        {files.length > 0 && (
          <section className="w-full max-w-2xl mt-8 px-4">
            {/* List header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Uploaded — {files.length} {files.length === 1 ? 'image' : 'images'}
              </h2>
              <button
                type="button"
                onClick={() => files.forEach((f) => removeFile(f.id))}
                className="text-xs text-gray-600 hover:text-red-400 transition-colors duration-200"
              >
                Clear all
              </button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {files.map((entry) => (
                <ImageCard
                  key={entry.id}
                  entry={entry}
                  onRemove={removeFile}
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
