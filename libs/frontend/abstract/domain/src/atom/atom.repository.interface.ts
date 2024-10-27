import type { IAtomDto } from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomDeleteInput,
  AtomFragment,
  AtomOptions,
  AtomUpdateInput,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IAtomModel } from './atom.model.interface'

export type IAtomRepository = IRepository<
  IAtomDto,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
