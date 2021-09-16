import { z } from 'zod'

export type QueryPageHookConfig = {
  pageId: string
}

export const queryPageHookConfigSchema: z.ZodSchema<QueryPageHookConfig> =
  z.object({
    pageId: z.string().nonempty(),
  })
