export const isServer = typeof window === 'undefined'

// should be true only for production environment, not for every optimized build
// (can't rely on NODE_ENV, on preview builds it is also 'production')
export const isProduction =
  process.env['VERCEL_ENV'] === 'production' ||
  process.env['NEXT_PUBLIC_VERCEL_ENV'] === 'production'

export const isTest = process.env['NODE_ENV'] === 'test'

export const isCi =
  // Vercel uses '1'
  process.env['CI'] === '1' ||
  // Others may use 'true'
  process.env['CI'] === 'true'

// should be true only for preview environment, not for production
export const isVercelPreview =
  process.env['VERCEL_ENV'] === 'preview' ||
  process.env['NEXT_PUBLIC_VERCEL_ENV'] === 'preview'

export const isVercel =
  process.env['VERCEL'] === '1' ||
  Boolean(process.env['NEXT_PUBLIC_VERCEL_URL'])

export const isCircleCi = process.env['CIRCLECI'] === 'true'
