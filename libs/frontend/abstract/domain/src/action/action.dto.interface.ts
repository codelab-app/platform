import type {
  SchemaBuilder,
  SelectOption,
} from '@codelab/frontend-abstract-types'
import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared-abstract-core'

export type ICreateActionSchemaBuilder = SchemaBuilder<
  { actions: Array<SelectOption>; resources: Array<SelectOption> },
  ICreateActionData
>

export type IUpdateActionSchemaBuilder = SchemaBuilder<
  { actions: Array<SelectOption>; resources: Array<SelectOption> },
  IUpdateActionData
>
