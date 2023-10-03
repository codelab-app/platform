import type {
  FieldFragment,
  FieldOptions,
  FieldWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../../service'
import type { IField } from './field.interface'

export type IFieldRepository = IRepository<
  IField,
  FieldFragment,
  FieldWhere,
  FieldOptions
>
