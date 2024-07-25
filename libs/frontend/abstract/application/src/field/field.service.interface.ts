import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateFieldData,
  IRef,
  IUpdateFieldData,
} from '@codelab/shared/abstract/core'
import type { ICRUDService } from '../services'

export interface IFieldService
  extends Omit<
    ICRUDService<IFieldModel, ICreateFieldData, IUpdateFieldData>,
    'remove'
  > {
  cloneField(field: IFieldModel, apiId: string): Promise<IFieldModel>
  deleteField(fields: Array<IFieldModel>): Promise<number>

  moveFieldAsNextSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
  moveFieldAsPrevSibling(props: {
    field: IRef
    targetField: IRef
  }): Promise<void>
}
