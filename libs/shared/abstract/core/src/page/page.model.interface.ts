import type { Static, StaticDecode, StaticEncode } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { PageDtoSchema } from './page.dto.interface'

export const PageSchema = Type.Composite([
  PageDtoSchema,
  Type.Object({
    slug: Type.String(),
  }),
])

export type IPage = Static<typeof PageSchema>
