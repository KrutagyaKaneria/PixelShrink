function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 mt-auto py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5 text-center">

        {/* CTA Button */}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-cyan-500
            hover:from-blue-500 hover:to-cyan-400
            text-white font-semibold text-sm tracking-wide
            shadow-lg shadow-blue-500/20
            hover:shadow-blue-500/40
            transition-all duration-300 hover:scale-105
            active:scale-100
          "
        >
          Built for Digital Heroes
        </a>

        {/* Name & Email */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-500">
          <span className="text-gray-300 font-medium">Krutagya Kaneria</span>
          <span className="hidden sm:block text-gray-700">·</span>
          <a
            href="mailto:krutagya.kaneria.cg@gmail.com"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            krutagya.kaneria.cg@gmail.com
          </a>
        </div>

        <p className="text-gray-700 text-xs">
          © {new Date().getFullYear()} PixelShrink — All processing happens in your browser.
        </p>
      </div>
    </footer>
  )
}

export default Footer
