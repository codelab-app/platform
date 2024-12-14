import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { DomainSchema } from '../domain/domain.dto.interface'
import { PageSchema } from '../page'
import { AppDtoSchema } from './app.dto.interface'

export const AppSchema = Type.Object({
  ...AppDtoSchema.properties,
  domains: Type.Optional(Type.Array(DomainSchema)),
  pages: Type.Optional(Type.Array(PageSchema)),
})

export type IApp = Static<typeof AppSchema>
