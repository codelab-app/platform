import type {
  ICreateFieldData,
  IFieldDomainService,
  IFieldModel,
  IInterfaceTypeModel,
  ITypeModel,
  IUpdateFieldData,
} from '@codelab/frontend/abstract/domain'
import type { FieldFragment } from '@codelab/shared/abstract/codegen'
import type { IFieldDTO, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IEntityModalService,
} from '../services'
import type { IFieldRepository } from './field.repo.interface'

export interface IFieldService
  extends Omit<
      ICRUDService<IFieldModel, ICreateFieldData, IUpdateFieldData>,
      'delete'
    >,
    Omit<
      ICRUDModalService<Ref<IFieldModel>, { field?: IFieldModel }>,
      'createModal'
    >,
    Omit<
      ICRUDFormService<Ref<IFieldModel>, { field?: IFieldModel }>,
      'createForm'
    > {
  createForm: IEntityFormService<
    Ref<IInterfaceTypeModel>,
    { interface?: IInterfaceTypeModel }
  >
  createModal: IEntityModalService<
    Ref<IInterfaceTypeModel>,
    { interface?: IInterfaceTypeModel }
  >
  fieldDomainService: IFieldDomainService
  fieldRepository: IFieldRepository

  cloneField(field: IFieldModel, apiId: string): Promise<IFieldModel>
  delete(fields: Array<IFieldModel>): Promise<number>

  moveFieldAsNextSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
  moveFieldAsPrevSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
}
