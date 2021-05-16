import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { DgraphTokens } from './dgraph.tokens'

export interface DgraphConfiguration {
  endpoint: string
}

export const dgraphConfig = registerAs(
  DgraphTokens.DgraphConfig,
  (): DgraphConfiguration => ({
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required(true).asString(),
  }),
)
