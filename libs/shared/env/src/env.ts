export const isServer = typeof window === 'undefined'

export const isProduction = process.env['NODE_ENV'] === 'production'

export const isCi =
  // Vercel uses '1'
  process.env['CI'] === '1' ||
  // Others may use 'true'
  process.env['CI'] === 'true'
