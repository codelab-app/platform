import type {
  IActionModel,
  IActionWhere,
} from '@codelab/frontend-abstract-domain'
import type { IPopover } from '@codelab/frontend-abstract-types'
import type {
  ICreateActionData,
  IRef,
  IUpdateActionData,
} from '@codelab/shared-abstract-core'
import type { ApiActionOptions } from '@codelab/shared-infra-gqlgen'

import type { ICrudService, IQueryService } from '../services'
import type {
  IActionCreateRoute,
  IActionUpdateRoute,
} from './action.route.interface'

export interface IActionService
  extends ICrudService<IRef, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions> {
  createPopover: IPopover<IActionCreateRoute>
  deletePopover: IPopover<IActionUpdateRoute>
  updatePopover: IPopover<IActionUpdateRoute>
  cloneAction(action: IActionModel, storeId: string): Promise<IRef>
}
