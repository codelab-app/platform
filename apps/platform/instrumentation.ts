import { registerCustomOTel } from '@codelab/shared/infra/otel'
import { registerOTel } from '@vercel/otel'

export const register = () => {
  registerOTel('codelab-builder')
}
