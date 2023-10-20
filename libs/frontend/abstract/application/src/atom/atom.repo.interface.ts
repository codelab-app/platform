import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IAtomRepository = IRepository<
  IAtomModel,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
