import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
  GetSelectAtomOptionsQuery,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IAtomModel } from './atom.model.interface'

export type IAtomRepository = IRepository<
  IAtomModel,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  getSelectAtomOptions(): Promise<GetSelectAtomOptionsQuery['atoms']>
}
