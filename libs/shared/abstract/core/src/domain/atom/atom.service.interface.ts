import { AtomWhere } from '@codelab/shared/abstract/codegen'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service/service.interface'
import { ICreateAtomDTO, IUpdateAtomDTO } from './atom.dto.interface'
import { IAtom } from './atom.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere> {
  // ICRUDModalService<Ref<IAtom>>
  atoms: ObjectMap<IAtom>
  deleteMany(atoms: Array<IAtom>): any
  updateCache(atoms: any): void

  createModal: IModalService
  updateModal: IModalService<Ref<IAtom>>
  deleteModal: IModalService<Array<Ref<IAtom>>, { atoms: Array<IAtom> }>
}
