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
    // We set DG_AUTH inside CircleCI config with CODELAB_DGRAPH_INTEGRATION_ENDPOINT or CODELAB_DGRAPH_INTEGRATION_DG_AUTH
    endpoint: '',
    apiKey: get('DG_AUTH').asString(),
  }),
)
