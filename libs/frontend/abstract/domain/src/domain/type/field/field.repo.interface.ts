import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  FieldFragment,
  FieldOptions,
  FieldWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IFieldRepository = IRepository<
  IFieldModel,
  FieldFragment,
  FieldWhere,
  FieldOptions
>
