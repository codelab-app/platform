import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IAtom } from './atom.model.interface'

export type IAtomRepository = IRepository<
  IAtom,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  findOptions(): Promise<Array<Pick<IAtom, 'id' | 'name' | 'type'>>>
}
