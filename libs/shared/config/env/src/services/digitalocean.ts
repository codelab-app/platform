import { env } from '../env'

export interface IDigitalOceanEnvVars {
  digitalOceanApiToken: string
}

export class DigitalOceanEnvVars implements IDigitalOceanEnvVars {
  get digitalOceanApiToken() {
    return env.get('DIGITALOCEAN_API_TOKEN').default('').asString()
  }
}
