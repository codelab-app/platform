import type {
  IAtomDomainService,
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { IAtom } from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type { GuaranteedProps } from 'uniforms'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IPaginateable,
  IQueryService,
} from '../services'
import type { IAtomRepository } from './atom.repo.interface'

export interface IAtomService
  extends Omit<
      ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
      'delete'
    >,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    Omit<
      ICRUDModalService<Ref<IAtomModel>, { atom?: IAtomModel }>,
      'deleteModal'
    >,
    ICRUDFormService<Ref<IAtomModel>, { atom?: IAtomModel }>,
    IPaginateable<IAtomModel, { name?: string }> {
  atomDomainService: IAtomDomainService
  atomRepository: IAtomRepository
  deleteManyModal: IEntityModalService<
    Array<Ref<IAtomModel>>,
    { atoms: Array<IAtomModel> }
  >

  delete(ids: Array<string>): Promise<number>
  getSelectAtomOptions(
    fieldProps: GuaranteedProps<string | undefined>,
    parent: IAtomModel | undefined,
  ): Promise<Array<DefaultOptionType>>
}
