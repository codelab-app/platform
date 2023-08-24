import { Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const GraphqlHookConfigSchema = Type.Object({
  dataKey: Typebox.Nullish(Type.String()),
  graphqlBody: Type.String({ minLength: 1 }),
  graphqlUrl: Type.String({ format: 'uri', minLength: 1 }),
})

export type IGraphqlHookConfig = Static<typeof GraphqlHookConfigSchema>
