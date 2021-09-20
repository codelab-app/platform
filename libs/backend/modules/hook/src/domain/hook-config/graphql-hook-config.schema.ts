import { z } from 'zod'

export type GraphqlHookConfig = {
  body: string
  url: string
  dataKey?: string
}

export const graphqlHookConfigSchema: z.ZodSchema<GraphqlHookConfig> = z.object(
  {
    body: z.string().nonempty(),
    dataKey: z.string().optional(),
    url: z.string().nonempty().url(),
  },
)
