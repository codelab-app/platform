import type { IAtomDto } from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomFragment,
  AtomOptions,
  AtomUpdateInput,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/infra/gql'

import type { IRepository, IRepositoryDto } from '../shared'
import type { IAtomModel } from './atom.model.interface'

export type IAtomRepository = IRepositoryDto<
  AtomCreateInput,
  AtomUpdateInput,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
