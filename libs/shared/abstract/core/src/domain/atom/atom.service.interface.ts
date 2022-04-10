import { AtomWhere } from '@codelab/shared/abstract/codegen'
import { ObjectMap } from 'mobx-keystone'
import { ICRUDService, IQueryService } from '../../service/service.interface'
import { ICreateAtomDTO, IUpdateAtomDTO } from './atom.dto.interface'
import { IAtom } from './atom.interface'

export interface IAtomService
  extends ICRUDService<IAtom, ICreateAtomDTO, IUpdateAtomDTO>,
    IQueryService<IAtom, AtomWhere> {
  atoms: ObjectMap<IAtom>
  deleteMany(atoms: Array<IAtom>): any
  addOrUpdateAll(atoms: any): void
}
