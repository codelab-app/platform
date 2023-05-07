import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IPaginateable,
  IQueryService,
} from '../../service'
import type {
  IAtomDTO,
  ICreateAtomData,
  IUpdateAtomData,
} from './atom.dto.interface'
import type { IAtom } from './atom.model.interface'
import type { IAtomRepository } from './atom.repo.interface'

export interface IAtomService
  extends Omit<ICRUDService<IAtom, ICreateAtomData, IUpdateAtomData>, 'delete'>,
    IQueryService<IAtom, AtomWhere, AtomOptions>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'>,
    IPaginateable<IAtom, { name?: string }> {
  // Select dropdown for atoms need to load all atoms from the db
  // but this is a heavy operation, this flag allows to call it only once
  allAtomsLoaded: boolean
  atomRepository: IAtomRepository
  atoms: ObjectMap<IAtom>
  atomsList: Array<IAtom>
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtom>>,
    { atoms: Array<IAtom> }
  >

  add(atomDTO: IAtomDTO): IAtom
  delete(ids: Array<string>): Promise<number>
  getOptions(): Promise<Array<Pick<IAtom, 'id' | 'name' | 'type'>>>
}
