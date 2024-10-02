import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'

import type { ICRUDService } from '../services'

export interface IFieldService
  extends ICRUDService<IFieldModel, ICreateFieldData, IUpdateFieldData> {
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
