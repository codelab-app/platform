import { AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { IAuth0ID } from '../user'
import { ICreateAtomDTO, IUpdateAtomDTO } from './atom.dto.interface'
import { IAtom, IAtomRef } from './atom.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'> {
  _atoms: ObjectMap<IAtom>
  atom(id: string): Maybe<IAtom>
  atoms: Array<IAtom>
  deleteManyModal: IModalService<Array<Ref<IAtom>>, { atoms: Array<IAtom> }>
  deleteMany(atoms: Array<IAtomRef>): any

  updateCache(atoms: any): void
  selectedIds: ArraySet<string>
  setSelectedIds(arraySet: ArraySet<string>): void
}

export interface IImportAtomService {
  exportAtoms(ids: Array<string>): Promise<string>
  importAtoms(payloadString: string, auth0Id: IAuth0ID): Promise<void>
}
