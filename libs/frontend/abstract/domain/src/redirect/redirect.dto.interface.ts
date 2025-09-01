import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { IRedirectDto } from '@codelab/shared-abstract-core'

import type { SchemaBuilder } from '../atom'

export type IRedirectCreateFormData = IRedirectDto

export type IRedirectUpdateFormData = IRedirectCreateFormData

export type ICreateRedirectSchemaBuilder = SchemaBuilder<
  { authGuards: Array<SelectOption>; pages: Array<SelectOption> },
  IRedirectCreateFormData
>

export type IUpdateRedirectSchemaBuilder = SchemaBuilder<
  { authGuards: Array<SelectOption>; pages: Array<SelectOption> },
  IRedirectUpdateFormData
>
