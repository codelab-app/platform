import findConfig from 'findup-sync'

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

/**
 * Traverses up directory to find closest file with name
 */
export const envPath = (): string => {
  let filename = '.env.dev'

  if (isStaging) {
    filename = '.env.dev'
  } else if (isProd) {
    filename = '.env.prod'
  } else if (isE2e) {
    filename = '.env.e2e'
  } else if (isStaging) {
    filename = '.env.staging'
  }

  const path = findConfig(filename)

  if (!path) {
    throw new Error(`${filename} not found`)
  }

  return path
}
