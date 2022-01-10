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
    // During CircleCI, replaced with CODELAB_DGRAPH_INTEGRATION_ENDPOINT or CODELAB_DGRAPH_E2E_ENDPOINT
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required().asUrlString(),
    // Required only for Dgraph Cloud, replaced with CODELAB_DGRAPH_INTEGRATION_DG_AUTH or CODELAB_DGRAPH_E2E_DG_AUTH
    apiKey: get('DG_AUTH').asString(),
  }),
)
