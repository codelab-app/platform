import { z } from 'zod'

export const QueryLambdaHookConfigSchema = z.object({
  queryKey: z.string().min(1),
  lambdaId: z.string(),
})

export type IQueryLambdaHookConfig = z.infer<typeof QueryLambdaHookConfigSchema>
