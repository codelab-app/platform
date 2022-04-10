import { z } from 'zod'

export const GraphqlHookConfigSchema = z.object({
  graphqlBody: z.string().min(1),
  dataKey: z.string().optional().nullable(),
  graphqlUrl: z.string().min(1).url(),
})

export type IGraphqlHookConfig = z.infer<typeof GraphqlHookConfigSchema>
