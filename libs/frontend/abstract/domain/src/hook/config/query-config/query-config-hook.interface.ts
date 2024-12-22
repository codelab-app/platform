import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

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
export const QueryConfigHookConfigSchema = Type.Object({
  body: Typebox.Nullish(Type.String()),
  method: Typebox.Nullish(Type.Enum(QueryMethod)),
  queryKey: Type.String({ minLength: 1 }),
  url: Typebox.Nullish(Type.String({ format: 'uri' })),
})
// z
//   .object({
//     queryKey: Type.String().min(1),
//   })
//   .and(
//     z
//       .object({
//         lambdaid: Type.String().nullish(),
//       })
//       .or(
//         Type.Object({
//           url: Type.String().url(),
//           body: Type.String().optional(),
//           method: z.nativeEnum(QueryMethod),
//         }),
//       ),
//   )

export type IQueryConfigHookConfig = Static<typeof QueryConfigHookConfigSchema>
