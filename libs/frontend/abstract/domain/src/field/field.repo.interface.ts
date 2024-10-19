import type { IRef } from '@codelab/shared/abstract/core'
import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldFragment,
  FieldOptions,
  FieldUpdateInput,
  FieldWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IFieldModel } from './field.model.interface'

export type IFieldRepository = IRepository<
  FieldCreateInput,
  FieldUpdateInput,
  FieldDeleteInput,
  FieldFragment,
  FieldWhere,
  FieldOptions
> & {
  updateNodes(field: IFieldModel): Promise<IRef>
}
