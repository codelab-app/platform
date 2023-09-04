import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ImportDto = Type.Object({})

export type ImportDto = Static<typeof ImportDto>
