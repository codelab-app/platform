import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const QueryPageHookConfigSchema = Type.Object({
  pageId: Type.String({ minLength: 1 }),
})

export type IQueryPageHookConfig = Static<typeof QueryPageHookConfigSchema>
