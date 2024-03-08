// import { registerOTel } from '@vercel/otel'

export const register = async () => {
  // registerOTel('platform')

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // await import('./instrumentation.node')
  }
}
