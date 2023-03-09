import type { Nullable } from '@codelab/shared/abstract/types'

export interface IGraphQLActionConfig {
  query: string
  variables?: Nullable<string>
  headers?: Nullable<string>
}
