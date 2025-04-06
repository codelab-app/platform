import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const digitaloceanConfig = registerAs('digitalocean', () => ({
  apiToken: get('DIGITALOCEAN_API_TOKEN').default('').asString(),
  dropletName: get('DIGITALOCEAN_DROPLET_NAME').required().asString(),
}))
