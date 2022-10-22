export const isServer = typeof window === 'undefined'

export const isProduction = process.env.NODE_ENV === 'production'

export const isCi = process.env.CI === 'true'
