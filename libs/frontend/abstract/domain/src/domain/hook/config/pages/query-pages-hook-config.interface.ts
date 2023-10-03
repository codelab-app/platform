// export interface IQueryPagesHookConfig {
//   __typename: 'QueryPagesHookConfig'
//   appId: string
// }

import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const QueryPagesHookConfigSchema = Type.Object({
  appId: Type.String({ minLength: 1 }),
})

export type IQueryPagesHookConfig = Static<typeof QueryPagesHookConfigSchema>
