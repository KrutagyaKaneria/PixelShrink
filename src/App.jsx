import Header from './components/Header'
import Dropzone from './components/Dropzone'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">

      {/* Page content — grows to fill, pushes footer down */}
      <main className="flex flex-col items-center w-full flex-1 max-w-3xl px-4 sm:px-6 pb-12">
        <Header />

        {/* Subtle divider */}
        <div className="w-full max-w-2xl border-t border-gray-800/60 mb-10" />

        <Dropzone />
      </main>

      <Footer />
    </div>
  )
}

export default App
