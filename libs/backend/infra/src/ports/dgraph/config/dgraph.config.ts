import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { DgraphTokens } from './dgraph.tokens'

export interface DgraphConfig {
  endpoint: string
  apiKey?: string
}

export const dgraphConfig = registerAs<DgraphConfig>(
  DgraphTokens.DgraphConfig.toString(),
  () => ({
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required().asUrlString(),
    apiKey: get('CODELAB_DGRAPH_API_KEY').asString(),
  }),
)
