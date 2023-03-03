import { z } from 'zod'

export const QueryLambdaHookConfigSchema = z.object({
  lambdaId: z.string(),
  queryKey: z.string().min(1),
})

export type IQueryLambdaHookConfig = z.infer<typeof QueryLambdaHookConfigSchema>
