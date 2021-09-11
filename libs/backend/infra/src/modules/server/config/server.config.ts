import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { ServerTokens } from './server.tokens'

export interface ServerConfig {
  endpoint: string
  webEndpoint: string
}

export const serverConfig = registerAs<ServerConfig>(
  ServerTokens.ServerConfig.toString(),
  () => {
    return {
      endpoint: get('CODELAB_API_ENDPOINT').required().asUrlString(),
      webEndpoint: get('NEXT_PUBLIC_API_ORIGIN').required().asUrlString(),
    }
  },
)
