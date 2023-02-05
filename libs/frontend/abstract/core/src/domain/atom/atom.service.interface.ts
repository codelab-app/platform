import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type {
  IAtomDTO,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from './atom.dto.interface'
import type { IAtom } from './atom.model.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere, AtomOptions>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'>,
    ICacheService<IAtomDTO, IAtom> {
  // Select dropdown for atoms need to load all atoms from the db
  // but this is a heavy operation, this flag allows to call it only once
  allAtomsLoaded: boolean
  atoms: ObjectMap<IAtom>
  count: number
  atomsList: Array<IAtom>
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtom>>,
    { atoms: Array<IAtom> }
  >
  selectedIds: ArraySet<string>
  setSelectedIds(arraySet: ArraySet<string>): void
}
