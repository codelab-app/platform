import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import { IElementDTO } from '../element'
import { IAtomDTO, ICreateAtomDTO, IUpdateAtomDTO } from './atom.dto.interface'
import { IAtom, IAtomRef } from './atom.model.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere, AtomOptions>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'>,
    ICacheService<IAtomDTO, IAtom> {
  atoms: ObjectMap<IAtom>
  count: number
  atomsList: Array<IAtom>
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtom>>,
    { atoms: Array<IAtom> }
  >
  deleteMany(atoms: Array<IAtomRef>): Promise<Array<IAtom>>

  selectedIds: ArraySet<string>
  setSelectedIds(arraySet: ArraySet<string>): void
  writeCacheFromElements(elements: Array<IElementDTO>): Array<IAtom>
}
