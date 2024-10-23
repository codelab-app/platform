import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICRUDService } from '../services'

export interface IFieldService
  extends ICRUDService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
  createPopover: IPopover
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
