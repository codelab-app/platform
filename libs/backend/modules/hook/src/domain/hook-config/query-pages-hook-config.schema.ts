import { z } from 'zod'

export type QueryPagesHookConfig = {
  appId: string
}

export const queryPagesHookConfigSchema: z.ZodSchema<QueryPagesHookConfig> =
  z.object({
    appId: z.string().nonempty(),
  })
