import type {
  SchemaBuilder,
  SelectOption,
} from '@codelab/frontend-abstract-types'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared-abstract-core'

export type ICreateTagSchemaBuilder = SchemaBuilder<
  { tags: Array<SelectOption> },
  ICreateTagData
>

export type IUpdateTagSchemaBuilder = SchemaBuilder<
  { tags: Array<SelectOption> },
  IUpdateTagData
>
