import { z } from 'zod'

export type GraphqlQueryHookConfig = {
  body: string
  url: string
  dataKey?: string
}

export const graphqlQueryHookConfigSchema: z.ZodSchema<GraphqlQueryHookConfig> =
  z.object({
    body: z.string().nonempty(),
    dataKey: z.string().optional(),
    url: z.string().nonempty().url(),
  })
