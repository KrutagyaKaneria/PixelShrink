function Header() {
  return (
    <header className="w-full text-center py-10 px-4">
      <div className="flex items-center justify-center gap-3 mb-3">
        {/* Icon */}
        <span className="text-blue-500 text-4xl">⚡</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Image{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Compressor
          </span>
        </h1>
      </div>
      <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        Compress and convert images instantly, right in your browser.{" "}
        <span className="text-gray-300 font-medium">Nothing is uploaded.</span>
      </p>
    </header>
  )
}

export default Header
