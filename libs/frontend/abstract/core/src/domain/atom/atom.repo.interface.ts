import type {
  AtomFragment,
  AtomOptions,
  AtomType,
  AtomWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IAtom } from './atom.model.interface'

export type IAtomRepository = IRepository<
  IAtom,
  AtomFragment,
  AtomWhere,
  AtomOptions
> & {
  findOptions(): Promise<
    Array<{
      id: string
      name: string
      type: AtomType
      requiredParents: Array<{ id: string; type: AtomType }>
    }>
  >
}
