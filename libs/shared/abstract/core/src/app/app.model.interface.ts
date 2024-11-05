import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/build/cjs/value'

import { DomainSchema } from '../domain/domain.dto.interface'
import { PageSchema } from '../page'
import { OwnerSchema } from '../user'
import { AppDtoSchema } from './app.dto.interface'

export const AppSchema = Type.Object({
  ...AppDtoSchema.properties,
  domains: Type.Optional(Type.Array(DomainSchema)),
  pages: Type.Optional(Type.Array(PageSchema)),
})

export type IApp = Static<typeof AppSchema>
