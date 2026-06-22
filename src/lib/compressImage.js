/**
 * Detects whether the browser supports encoding WebP via canvas.toBlob.
 * Cached after first call.
 */
let _webpSupported = null
function supportsWebPEncoding() {
  if (_webpSupported !== null) return _webpSupported
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  _webpSupported = canvas.toDataURL('image/webp').startsWith('data:image/webp')
  return _webpSupported
}

/**
 * Maps short format keys to MIME types.
 */
const MIME = {
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  png:  'image/png',
  webp: 'image/webp',
}

/**
 * Derives a sensible default format key from a File's MIME type.
 * Falls back to 'jpg'.
 */
export function defaultFormatForFile(file) {
  if (file.type === 'image/png')  return 'png'
  if (file.type === 'image/webp') return 'webp'
  return 'jpg'
}

/**
 * Compresses (and optionally converts) an image file using the Canvas API.
 *
 * @param {File}   file     — original File object
 * @param {number} quality  — 0.0–1.0 (ignored for PNG, which is lossless)
 * @param {string} format   — 'jpg' | 'png' | 'webp'
 *
 * @returns {Promise<{ objectUrl: string, blob: Blob, size: number }>}
 *   Resolves with a fresh object URL, the blob, and its byte size.
 *   The caller is responsible for calling URL.revokeObjectURL(objectUrl) when done.
 *
 * @throws {Error} if the browser doesn't support WebP encoding, or if loading fails.
 */
export async function compressImage(file, quality, format) {
  const mime = MIME[format] ?? 'image/jpeg'

  // Guard: check WebP support before doing any work
  if (mime === 'image/webp' && !supportsWebPEncoding()) {
    throw new Error('WebP encoding is not supported in this browser.')
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    const tempUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(tempUrl)

      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')

      // ── Transparency fix ──────────────────────────────────────────────────
      // JPEG has no alpha channel. Without a white fill first, any transparent
      // pixels (e.g. from a PNG source) will render as black in the output.
      if (mime === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      // PNG is always lossless — passing a quality value has no effect, so we
      // pass undefined to keep the intent clear.
      const qualityArg = mime === 'image/png' ? undefined : quality

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('canvas.toBlob returned null — compression failed.'))
            return
          }
          resolve({
            objectUrl: URL.createObjectURL(blob),
            blob,
            size: blob.size,
          })
        },
        mime,
        qualityArg
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(tempUrl)
      reject(new Error(`Failed to load image: ${file.name}`))
    }

    img.src = tempUrl
  })
}
