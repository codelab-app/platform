import { AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { IAtomDTO, ICreateAtomDTO, IUpdateAtomDTO } from './atom.dto.interface'
import { IAtom, IAtomRef } from './atom.model.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'>,
    ICacheService<IAtomDTO, IAtom> {
  _atoms: ObjectMap<IAtom>
  atom(id: string): Maybe<IAtom>
  atoms: Array<IAtom>
  deleteManyModal: IModalService<Array<Ref<IAtom>>, { atoms: Array<IAtom> }>
  deleteMany(atoms: Array<IAtomRef>): any

  selectedIds: ArraySet<string>
  setSelectedIds(arraySet: ArraySet<string>): void
}
