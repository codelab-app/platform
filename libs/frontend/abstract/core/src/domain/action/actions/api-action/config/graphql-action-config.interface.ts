import type { Nullable } from '@codelab/shared/abstract/types'

export interface IGraphQLActionConfig {
  headers?: Nullable<string>
  query: string
  variables?: Nullable<string>
}
