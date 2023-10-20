import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const LambdaSchema = Type.Object({
  body: Type.String(),
  id: Type.String({ default: '' }),
  name: Type.String(),
  ownerId: Type.String(),
})

export type ILambda = Static<typeof LambdaSchema>
