import { z } from 'zod'

// export interface IQueryPagesHookConfig {
//   __typename: 'QueryPagesHookConfig'
//   appId: string
// }

export const QueryPagesHookConfigSchema = z.object({
  appId: z.string().min(1),
})

export type IQueryPagesHookConfig = z.infer<typeof QueryPagesHookConfigSchema>
