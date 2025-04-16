import type { IFieldModel } from '@codelab/frontend-abstract-domain'
import type { IPopover } from '@codelab/frontend-abstract-types'
import type {
  IFieldCreateData,
  IFieldUpdateData,
  IRef,
} from '@codelab/shared-abstract-core'

import type { ICrudService } from '../services'
import type {
  IFieldCreateRoute,
  IFieldUpdateRoute,
} from './field.route.interface'

export interface IFieldService
  extends ICrudService<IFieldModel, IFieldCreateData, IFieldUpdateData> {
  createPopover: IPopover<IFieldCreateRoute, IFieldCreateRoute>
  deletePopover: IPopover<IFieldUpdateRoute, IFieldUpdateRoute>
  updatePopover: IPopover<IFieldUpdateRoute, IFieldUpdateRoute>
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
