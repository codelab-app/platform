import type {
  IActionModel,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import type {
  BuilderContextParams,
  IPopover,
} from '@codelab/frontend/abstract/types'
import type {
  ICreateActionData,
  IRef,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { ApiActionOptions } from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'

export type CrudActionPopoverParams = BuilderContextParams & {
  actionId?: string
  storeId?: string
}

export interface IActionService
  extends ICrudService<IRef, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions> {
  createPopover: IPopover<CrudActionPopoverParams>
  deletePopover: IPopover<CrudActionPopoverParams>
  updatePopover: IPopover<CrudActionPopoverParams>
  cloneAction(action: IActionModel, storeId: string): Promise<IRef>
}
