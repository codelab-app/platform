import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { SortDirection } from '@codelab/shared/infra/gqlgen'

export interface Option {
  limit?: Nullish<number>
  offset?: Nullish<number>
  sort?: Nullable<
    Array<{
      name: Nullable<SortDirection>
    }>
  >
}

export interface Where {
  name?: Nullish<string>
}
