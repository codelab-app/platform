import { EnvPlatform } from '@codelab/shared/infra/config'

export const baseHeaders = {
  Authorization: `Bearer ${EnvPlatform().vercel.vercel_api_token}`,
  'Content-Type': 'application/json',
}
