import type {
  IActionDomainService,
  IActionModel,
  IActionWhere,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { ApiActionOptions } from '@codelab/shared/abstract/codegen'
import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IQueryService,
} from '../services'

export interface IActionService
  extends ICRUDService<IActionModel, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions>,
    ICRUDModalService<Ref<IActionModel>, { action?: IActionModel }>,
    Omit<
      ICRUDFormService<Ref<IActionModel>, { action?: IActionModel }>,
      'createForm'
    > {
  actionDomainService: IActionDomainService
  createForm: IEntityFormService<Ref<IStoreModel>, { store?: IStoreModel }>

  cloneAction(action: IActionModel, storeId: string): Promise<IActionModel>
}
