import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { DgraphTokens } from './dgraph.tokens'

export interface DgraphConfiguration {
  endpoint: string
}

export const dgraphConfig = registerAs<() => DgraphConfiguration>(
  DgraphTokens.DgraphConfig.toString(),
  () => ({
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required(true).asString(),
  }),
)

export const dgraphTestConfig = registerAs(
  DgraphTokens.DgraphConfig.toString(),
  () => ({
    endpoint: get('CODELAB_DGRAPH_TEST_ENDPOINT').required(true).asString(),
  }),
)
