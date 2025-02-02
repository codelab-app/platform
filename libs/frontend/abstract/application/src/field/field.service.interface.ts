import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  BuilderContextParams,
  IPopover,
} from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'

export type UpdatePopoverParamsContext = BuilderContextParams & {
  fieldId: string
}

export interface IFieldService
  extends ICrudService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
  createPopover: IPopover<
    BuilderContextParams & { interfaceId: string },
    BuilderContextParams
  >
  deletePopover: IPopover<UpdatePopoverParamsContext, BuilderContextParams>
  updatePopover: IPopover<UpdatePopoverParamsContext, BuilderContextParams>
  cloneField(field: IFieldModel, apiId: string): Promise<IFieldModel>
  moveFieldAsNextSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
  moveFieldAsPrevSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
}
