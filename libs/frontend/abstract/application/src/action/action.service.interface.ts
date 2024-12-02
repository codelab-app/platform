import type {
  IActionModel,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type {
  IActionDto,
  ICreateActionData,
  IRef,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { ApiActionOptions } from '@codelab/shared/infra/gql'

import type { ICrudService, IQueryService } from '../services'

export interface IActionService
  extends ICrudService<IRef, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions> {
  createPopover: IPopover
  updatePopover: IPopover
  cloneAction(action: IActionModel, storeId: string): Promise<IRef>
}
