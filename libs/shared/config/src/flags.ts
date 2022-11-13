export const isServer = typeof window === 'undefined'

export const isProduction = process.env['NODE_ENV'] === 'production'

export const isTest = process.env['NODE_ENV'] === 'test'

export const isCi =
  // Vercel uses '1'
  process.env['CI'] === '1' ||
  // Others may use 'true'
  process.env['CI'] === 'true'

export const isVercelPreview = process.env['VERCEL_ENV'] === 'preview'

export const isVercel = process.env['VERCEL'] === '1'

export const isCircleCi = process.env['CIRCLECI'] === 'true'
