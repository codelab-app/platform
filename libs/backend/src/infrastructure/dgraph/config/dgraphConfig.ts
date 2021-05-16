import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export interface DgraphConfiguration {
  endpoint: string
}

export const dgraphConfig = registerAs(
  'dgraph',
  (): DgraphConfiguration => ({
    endpoint: get('CODELAB_DGRAPH_ENDPOINT').required(true).asString(),
  }),
)
