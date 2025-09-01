import type { SelectOption } from '@codelab/frontend-abstract-types'
import type {
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared-abstract-core'

import type { SchemaBuilder } from '../atom'

export type ICreateActionSchemaBuilder = SchemaBuilder<
  { actions: Array<SelectOption>; resources: Array<SelectOption> },
  ICreateActionData
>

export type IUpdateActionSchemaBuilder = SchemaBuilder<
  { actions: Array<SelectOption>; resources: Array<SelectOption> },
  IUpdateActionData
>
