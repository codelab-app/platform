import findConfig from 'findup-sync'

/**
 * Traverses up directory to find closest file with name
 * @param filename
 */
export const envPath = (filename = '.env.dev'): string => {
  const path = findConfig(filename)

  if (!path) {
    throw new Error(`${filename} not found`)
  }

  return path
}

export type environments = 'e2e' | 'staging' | 'production' | 'development'

/**
 * Used for e2e testing, database is cleared each time
 */
export const isE2e = process.env.CODELAB_ENV === 'e2e'

/**
 * Used for staging server
 */
export const isStaging = process.env.CODELAB_ENV === 'staging'

/**
 * Use for live site
 */
export const isProd = process.env.CODELAB_ENV === 'production'

/**
 * Used for local development
 */
export const isDev = !isE2e && !isStaging && !isProd
