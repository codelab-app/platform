import { z } from 'zod'

export const QueryPageHookConfigSchema = z.object({
  pageId: z.string().min(1),
})

export type IQueryPageHookConfig = z.infer<typeof QueryPageHookConfigSchema>
