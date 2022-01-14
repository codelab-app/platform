import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { DgraphTokens } from './dgraph.tokens'

export interface DgraphConfig {
  endpoint?: string
  apiKey?: string
}

export const dgraphConfig = registerAs<DgraphConfig>(
  DgraphTokens.DgraphConfig.toString(),
  () => ({
    // We set DG_ADMIN_API_KEY inside CircleCI config based on env
    endpoint: get('CODELAB_DG_ENDPOINT').asUrlString(),
    apiKey: get('DG_ADMIN_API_KEY').asString(),
  }),
)
