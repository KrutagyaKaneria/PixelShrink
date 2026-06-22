import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * Bundles an array of compressed image outputs into a ZIP file and
 * triggers a browser download.
 *
 * @param {Array<{ filename: string, blob: Blob }>} items
 * @param {string} [zipName='pixelshrink-images.zip']
 */
export async function downloadAsZip(items, zipName = 'pixelshrink-images.zip') {
  if (!items || items.length === 0) return

  const zip = new JSZip()

  // Deduplicate filenames in case two files share the same base name
  const seen = new Map()
  for (const { filename, blob } of items) {
    let name = filename
    if (seen.has(name)) {
      const count = seen.get(name) + 1
      seen.set(name, count)
      // Insert counter before extension: photo.jpg → photo (2).jpg
      const dot = name.lastIndexOf('.')
      name = dot !== -1
        ? `${name.slice(0, dot)} (${count})${name.slice(dot)}`
        : `${name} (${count})`
    } else {
      seen.set(name, 1)
    }
    zip.file(name, blob)
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  saveAs(zipBlob, zipName)
}
