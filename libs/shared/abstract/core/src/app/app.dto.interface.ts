import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { DomainDtoSchema, DomainSchema } from '../domain/domain.dto.interface'
import { PageDtoSchema, PageSchema } from '../page'
import { OwnerSchema } from '../user'

export const AppDtoSchema = Type.Composite([
  /**
   * Owner required for composite key
   */
  OwnerSchema,
  Type.Object({
    domains: Type.Optional(Type.Array(DomainDtoSchema)),
    id: Type.String(),
    name: Type.String(),
    pages: Type.Optional(Type.Array(PageDtoSchema)),
  }),
])

export type IAppDto = Static<typeof AppDtoSchema>
