import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import path from 'path'
import { ServerTokens } from './server.tokens'

export interface ServerConfig {
  endpoint: string
}

export const serverConfig = registerAs<() => ServerConfig>(
  ServerTokens.ServerConfig.toString(),
  () => {
    return {
      endpoint: get('CODELAB_API_ENDPOINT').required().asUrlString(),
    }
  },
)
