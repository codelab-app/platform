import findConfig from 'findup-sync'

export const envs = [
  'development',
  'ci',
  'e2e',
  'staging',
  'production',
] as const

export type environments = typeof envs[number]

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
 * Used for CircleCI
 */
export const isCi = process.env.CODELAB_ENV === 'ci'

/**
 * Used for local development
 */
export const isDev = !isCi && !isE2e && !isStaging && !isProd

/**
 * Traverses up directory to find closest file with name
 */
export const envPath = (): string => {
  const filename = '.env'

  if (!isDev) {
    return ''
  }

  const path = findConfig(filename)

  if (!path) {
    throw new Error(`${filename} not found`)
  }

  return path
}
