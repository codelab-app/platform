import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  ComponentContextParams,
  IPopover,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'

export type UpdatePopoverParamsContext = PageContextParams &
  ComponentContextParams & { fieldId: string }

export interface IFieldService
  extends ICrudService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
  createPopover: IPopover<
    PageContextParams & ComponentContextParams & { interfaceId: string }
  >
  deletePopover: IPopover<UpdatePopoverParamsContext>
  updatePopover: IPopover<UpdatePopoverParamsContext>
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
