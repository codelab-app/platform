import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'
import type {
  IFieldCreateRouteContext,
  IFieldRouteContext,
  IFieldUpdateRouteContext,
} from './field.route.interface'

export interface IFieldService
  extends ICrudService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
  createPopover: IPopover<IFieldCreateRouteContext, IFieldRouteContext>
  deletePopover: IPopover<IFieldUpdateRouteContext, IFieldRouteContext>
  updatePopover: IPopover<IFieldUpdateRouteContext, IFieldRouteContext>
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
