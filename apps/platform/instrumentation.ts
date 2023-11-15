import { logDatetime } from '@codelab/shared/infra/logging'
import { registerOTel } from '@vercel/otel'

export const register = async () => {
  logDatetime('beforeRegister')

  registerOTel('platform')

  logDatetime('afterRegister')

  console.log('next_runtime', process.env.NEXT_RUNTIME)

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // await import('./instrumentation.node')
  }
}
