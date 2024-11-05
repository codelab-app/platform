import type {
  Static,
  TAnySchema,
  TObject,
  TProperties,
  TSchema,
  TString,
} from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { DomainDtoSchema, DomainSchema } from '../domain/domain.dto.interface'
import { PageDtoSchema, PageSchema } from '../page'
import { OwnerSchema } from '../user'

export const AppDtoSchema = Type.Object({
  ...OwnerSchema.properties,
  domains: Type.Optional(Type.Array(Typebox.Ref)),
  id: Type.String(),
  name: Type.String(),
  pages: Type.Optional(Type.Array(Typebox.Ref)),
})

export type IAppDto = Static<typeof AppDtoSchema>
