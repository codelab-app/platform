import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { DomainSchema } from '../domain/domain.dto.interface'
import { PageSchema } from '../page'
import { AppDtoSchema } from './app.dto.interface'

export const AppSchema = Typebox.Overwrite(
  AppDtoSchema,
  Type.Object({
    domains: Type.Array(DomainSchema),
    pages: Type.Array(PageSchema),
    slug: Type.String(),
  }),
)

export type IApp = Static<typeof AppSchema>
