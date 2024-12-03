import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'

export interface IFieldService
  extends ICrudService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
  createPopover: IPopover
  deletePopover: IPopover
  updatePopover: IPopover
  cloneField(field: IFieldModel, apiId: string): Promise<IFieldModel>
  getOneFromCache(ref: IRef): IFieldModel | undefined
  moveFieldAsNextSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
  moveFieldAsPrevSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
}
