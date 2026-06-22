# ⚡ PixelShrink

**Free, client-side image compressor and format converter — no uploads, no servers, 100% private.**

> Live demo: [ADD LINK AFTER DEPLOYMENT]

---

## What is PixelShrink?

PixelShrink lets you compress and convert images directly in your browser using the Canvas API. There is no backend, no file upload, and no third-party service involved. Every byte of your image stays on your device.

This matters because most online image compressors upload your files to a remote server to process them — meaning your photos, screenshots, and documents leave your machine before you get the compressed version back. PixelShrink eliminates that entirely.

---

## Features

- **Drag-and-drop or click-to-browse** upload (multi-file)
- **Live quality slider** (5%–100%) with real-time before/after size display
- **Format conversion** — JPG, PNG, WebP per image
- **Transparency-safe** — PNG → JPG conversion fills transparent areas with white (no black artifacts)
- **WebP support detection** — graceful error if the browser can't encode WebP
- **Side-by-side thumbnails** — original vs. compressed preview in each card
- **Single download** — per-image download with correct extension (e.g. `photo-compressed.webp`)
- **Bulk ZIP download** — download all compressed images as one `.zip` with a single click
- **20 MB file warning** — oversized files are allowed but flagged
- **Non-image rejection** — non-image files are silently skipped with a clear inline error
- **Dark / Light mode toggle** — sun/moon button in the header, defaults to dark
- **Empty state** — friendly prompt when no images are loaded
- **Responsive** — works cleanly on 375px mobile and wide desktop
- **Zero uploads** — all processing happens via `<canvas>` in the browser tab

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | [React 18](https://react.dev/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Compression | Browser [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) (`canvas.toBlob`) |
| ZIP bundling | [JSZip](https://stuk.github.io/jszip/) |
| File saving | [file-saver](https://github.com/eligrey/FileSaver.js/) |
| Language | JavaScript (no TypeScript) |
| Deployment | [Vercel](https://vercel.com/) |

No paid libraries. No API keys. No backend.

---

## Project Structure

```
pixelshrink/
├── index.html                   # Entry point + SEO / OG meta tags
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Root layout, dark mode state, file list
    ├── index.css                # Tailwind directives
    ├── hooks/
    │   └── useImageFiles.js     # Upload state, preview URLs, cleanup
    ├── lib/
    │   ├── compressImage.js     # Canvas compression + format conversion
    │   └── zipUtils.js          # JSZip + file-saver ZIP builder
    └── components/
        ├── Header.jsx           # Title + dark/light mode toggle
        ├── Dropzone.jsx         # Drag-and-drop + file picker
        ├── ImageCard.jsx        # Per-image card: preview, slider, format, download
        ├── FormatSelector.jsx   # JPG / PNG / WebP pill buttons
        ├── DownloadButton.jsx   # Single-image download (file-saver)
        ├── DownloadAllButton.jsx# Bulk ZIP download
        ├── EmptyState.jsx       # Shown when no images are loaded
        ├── LoadingSpinner.jsx   # Reusable animated spinner
        └── Footer.jsx           # Name, email, "Built for Digital Heroes" CTA
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/pixelshrink.git
cd pixelshrink
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview   # preview the production bundle locally
```

---

## Deployment

This project is a pure static site — no server required.

**Deploy to Vercel (recommended):**

1. Push the repository to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Vite**
4. Click **Deploy**

After deployment, update `og:url` and `og:image` in `index.html` with your live URL.

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Canvas compression | ✅ | ✅ | ✅ | ✅ |
| WebP encoding | ✅ | ✅ | ✅ (v14+) | ✅ |
| Drag-and-drop | ✅ | ✅ | ✅ | ✅ |
| ZIP download | ✅ | ✅ | ✅ | ✅ |

If WebP encoding is unavailable (older Safari), the app shows a clear inline error on the affected card instead of crashing.

---

## Privacy

- **No data leaves your device.** Images are loaded into memory, drawn onto an offscreen `<canvas>`, and converted entirely within the browser tab.
- No analytics, no tracking, no cookies.
- Closing the tab discards all data.

---

## Author

**Krutagya Kaneria**
📧 [krutagya.kaneria.cg@gmail.com](mailto:krutagya.kaneria.cg@gmail.com)

Built for [Digital Heroes](https://digitalheroesco.com) ⚡

---

## License

MIT — free to use, modify, and distribute.
