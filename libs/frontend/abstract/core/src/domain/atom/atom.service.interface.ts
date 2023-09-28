import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import type { GuaranteedProps } from 'uniforms'
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
import type { IAtomModel } from './atom.model.interface'
import type { IAtomRepository } from './atom.repo.interface'

export interface IAtomService
  extends Omit<
      ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
      'delete'
    >,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    Omit<
      ICRUDModalService<Ref<IAtomModel>, { atom: Maybe<IAtomModel> }>,
      'deleteModal'
    >,
    ICRUDFormService<Ref<IAtomModel>, { atom: Maybe<IAtomModel> }>,
    IPaginateable<IAtomModel, { name?: string }> {
  atomRepository: IAtomRepository
  atoms: ObjectMap<IAtomModel>
  atomsList: Array<IAtomModel>
  defaultRenderType: IAtomModel | undefined
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtomModel>>,
    { atoms: Array<IAtomModel> }
  >
  dynamicComponents: Record<string, IComponentType>
  loadedExternalCssSources: ArraySet<string>
  loadedExternalJsSources: ArraySet<string>

  add(atomDTO: IAtomDTO): IAtomModel
  delete(ids: Array<string>): Promise<number>
  getDefaultElementRenderType(): Promise<IAtomModel>
  getSelectAtomOptions(
    fieldProps: GuaranteedProps<string | undefined>,
    parent: IAtomModel | undefined,
  ): Promise<Array<DefaultOptionType>>
}
