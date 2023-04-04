import type { FieldWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../../service'
import type { IField } from './field.interface'

export type IFieldRepository = Omit<
  IRepository<IField, IEntity, FieldWhere>,
  'find'
>
