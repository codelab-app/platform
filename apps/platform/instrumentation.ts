import { registerOTel } from '@vercel/otel'

export const register = async () => {
  registerOTel('platform')
}
