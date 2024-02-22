// import { registerOTel } from '@vercel/otel'

export const register = async () => {
  // registerOTel('platform')

  console.log('next_runtime', process.env.NEXT_RUNTIME)

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // await import('./instrumentation.node')
  }
}
