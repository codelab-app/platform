import type {
  AtomOptions,
  AtomType,
  AtomWhere,
} from '@codelab/shared/abstract/codegen'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import type { IComponentType } from '../../renderer'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IPaginateable,
  IQueryService,
} from '../../service'
import type { ICreateAtomData, IUpdateAtomData } from './atom.dto.interface'
import type { IAtom } from './atom.model.interface'
import type { IAtomRepository } from './atom.repo.interface'

export interface IAtomService
  extends Omit<ICRUDService<IAtom, ICreateAtomData, IUpdateAtomData>, 'delete'>,
    IQueryService<IAtom, AtomWhere, AtomOptions>,
    Omit<ICRUDModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'deleteModal'>,
    Pick<ICRUDFormService<Ref<IAtom>, { atom: Maybe<IAtom> }>, 'updateForm'>,
    IPaginateable<IAtom, { name?: string }> {
  atomRepository: IAtomRepository
  atoms: ObjectMap<IAtom>
  atomsList: Array<IAtom>
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtom>>,
    { atoms: Array<IAtom> }
  >
  dynamicComponents: Record<string, IComponentType>
  loadedExternalCssSources: ArraySet<string>
  loadedExternalJsSources: ArraySet<string>

  add(atomDTO: IAtomDTO): IAtom
  delete(ids: Array<string>): Promise<number>
  getOptions(): Promise<
    Array<{
      id: string
      name: string
      type: AtomType
      requiredParents: Array<{ id: string; type: AtomType }>
    }>
  >
}
