import type {
  FieldFragment,
  FieldWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../../service'
import type { IField } from './field.interface'

export type IFieldRepository = Omit<
  IRepository<IField, FieldFragment, FieldWhere>,
  'find'
>
