import { QueryMethod } from '@codelab/shared/enums'
import { z } from 'zod'

/**
 * Either a lambdaId, or url/body/method are required
 */
export type QueryHookConfig = {
  queryKey: string
  lambdaId?: string
  url?: string
  body?: string | null
  method?: QueryMethod
}

export const queryHookConfigSchema: z.ZodSchema<QueryHookConfig> = z
  .object({
    queryKey: z.string().nonempty(),
    lambdaId: z.string(),
  })
  .or(
    z.object({
      queryKey: z.string().nonempty(),
      url: z.string().url(),
      body: z.string().optional().nullable(),
      method: z.nativeEnum(QueryMethod),
    }),
  )
