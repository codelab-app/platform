import { z } from 'zod'
import { QueryMethod } from './query-method.enum'

// export interface IQueryHookConfig {
//   __typename: 'QueryHookConfig'
//   queryKey: string
//   url?: string
//   body?: string
//   method?: QueryMethod
//   lambdaId?: string
// }

/**
 * Either a lambdaId, or url/body/method are required
 *
 * Use simple type so we can implement
 */
export const QueryHookConfigSchema = z.object({
  queryKey: z.string().min(1),
  lambdaId: z.string().optional().nullable(),
  url: z.string().url().optional().nullable(),
  body: z.string().optional().nullable(),
  method: z.nativeEnum(QueryMethod).optional().nullable(),
})
// z
//   .object({
//     queryKey: z.string().min(1),
//   })
//   .and(
//     z
//       .object({
//         lambdaId: z.string(),
//       })
//       .or(
//         z.object({
//           url: z.string().url(),
//           body: z.string().optional(),
//           method: z.nativeEnum(QueryMethod),
//         }),
//       ),
//   )

export type IQueryHookConfig = z.infer<typeof QueryHookConfigSchema>
