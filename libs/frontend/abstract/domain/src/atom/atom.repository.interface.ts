import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/infra/gql'
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
