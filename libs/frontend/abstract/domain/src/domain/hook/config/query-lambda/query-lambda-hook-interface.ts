import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const QueryLambdaHookConfigSchema = Type.Object({
  lambdaId: Type.String(),
  queryKey: Type.String({ minLength: 1 }),
})

export type IQueryLambdaHookConfig = Static<typeof QueryLambdaHookConfigSchema>
