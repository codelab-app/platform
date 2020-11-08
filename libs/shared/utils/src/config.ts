import findConfig from 'findup-sync'

/**
 * Traverses up directory to find closest file with name
 * @param filename
 */
export const envPath = (filename = '.env'): string => {
  const path = findConfig(filename)

  if (!path) {
    throw new Error(`${filename} not found`)
  }

  return path
}
