import { useState, useCallback, useEffect } from 'react'

/**
 * Generates a stable unique ID for each file entry.
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Formats bytes into a human-readable KB / MB string.
 */
export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * Custom hook — manages the array of uploaded image file objects.
 *
 * Each entry shape:
 * {
 *   id:          string        — stable unique key
 *   file:        File          — original File object
 *   previewUrl:  string        — object URL for <img> preview
 *   size:        number        — bytes (same as file.size, kept for convenience)
 * }
 */
export function useImageFiles() {
  const [files, setFiles] = useState([])

  /**
   * Accepts a FileList or array of File objects.
   * Silently drops anything that isn't an image.
   * Returns the number of files that were rejected (non-image).
   */
  const addFiles = useCallback((incoming) => {
    const arr = Array.from(incoming)
    const valid = arr.filter((f) => f.type.startsWith('image/'))
    const rejectedCount = arr.length - valid.length

    if (valid.length === 0) return rejectedCount

    const newEntries = valid.map((f) => ({
      id: generateId(),
      file: f,
      previewUrl: URL.createObjectURL(f),
      size: f.size,
    }))

    setFiles((prev) => [...prev, ...newEntries])
    return rejectedCount
  }, [])

  /**
   * Removes a single file by its ID and revokes its object URL.
   */
  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const target = prev.find((entry) => entry.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((entry) => entry.id !== id)
    })
  }, [])

  /**
   * Revoke all object URLs when the hook unmounts.
   */
  useEffect(() => {
    return () => {
      setFiles((prev) => {
        prev.forEach((entry) => URL.revokeObjectURL(entry.previewUrl))
        return []
      })
    }
  }, [])

  return { files, addFiles, removeFile }
}
