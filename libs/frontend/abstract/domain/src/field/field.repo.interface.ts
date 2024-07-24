import type {
  FieldFragment,
  FieldOptions,
  FieldWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IFieldModel } from './field.model.interface'

export type IFieldRepository = IRepository<
  IFieldModel,
  FieldFragment,
  FieldWhere,
  FieldOptions
>
