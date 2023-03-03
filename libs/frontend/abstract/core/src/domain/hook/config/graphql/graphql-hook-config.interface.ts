import { z } from 'zod'

export const GraphqlHookConfigSchema = z.object({
  dataKey: z.string().optional().nullable(),
  graphqlBody: z.string().min(1),
  graphqlUrl: z.string().min(1).url(),
})

export type IGraphqlHookConfig = z.infer<typeof GraphqlHookConfigSchema>
