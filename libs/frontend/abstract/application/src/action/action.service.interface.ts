import type {
  IActionModel,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import type { ApiActionOptions } from '@codelab/shared/infra/gql'
import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { ICRUDService, IQueryService } from '../services'

export interface IActionService
  extends ICRUDService<IActionModel, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions> {
  // createForm: IEntityFormService<Ref<IStoreModel>, { store?: IStoreModel }>

  cloneAction(action: IActionModel, storeId: string): Promise<IActionModel>
}
