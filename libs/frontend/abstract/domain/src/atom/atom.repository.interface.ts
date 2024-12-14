import type { IAtomDto } from '@codelab/shared/abstract/core'
import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'

export type IAtomRepository = IRepository<
  IAtomDto,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
