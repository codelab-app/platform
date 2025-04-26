import { registerAs } from '@nestjs/config'
import env from 'env-var'

export const digitaloceanConfig = registerAs('digitalocean', () => ({
  apiToken: env.get('DIGITALOCEAN_API_TOKEN').default('').asString(),
  dropletName: env.get('DIGITALOCEAN_DROPLET_NAME').required().asString(),
}))
