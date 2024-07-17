import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
} from '@codelab/frontend/infra/gql'
import type { GetSelectAtomOptionsQuery } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../shared'
import type { IAtomModel } from './atom.model.interface'

export type IAtomRepository = IRepository<
  IAtomModel,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
