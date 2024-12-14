import type { IFieldDto, IRef } from '@codelab/shared/abstract/core'
import type {
  FieldFragment,
  FieldOptions,
  FieldWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IFieldModel } from './field.model.interface'

export type IFieldRepository = IRepository<
  IFieldDto,
  FieldFragment,
  FieldWhere,
  FieldOptions
> & {
  updateNodes(field: IFieldModel): Promise<IRef>
}
