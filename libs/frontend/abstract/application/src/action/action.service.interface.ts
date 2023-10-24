import type {
  IActionDomainService,
  IActionModel,
  IActionWhere,
  ICreateActionData,
  IStoreModel,
  IUpdateActionData,
} from '@codelab/frontend/abstract/domain'
import type {
  ActionFragment,
  ApiActionOptions,
} from '@codelab/shared/abstract/codegen'
import type { IActionDTO, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ObjectMap, Ref } from 'mobx-keystone'
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
