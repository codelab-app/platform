import type { Static, TKind, TSchema } from '@sinclair/typebox'

import { Kind, Type } from '@sinclair/typebox'

export const TRef: TKind = {
  [Kind]: '@codelab/Ref',
}

export const RefSchema = Type.Object({
  id: Type.String(),
})

export type IRef = Static<typeof RefSchema>

/**
 * For export data we want to include additional fields for readability purposes
 */
export const DiscriminatedRef = <T extends string>(
  typename: T,
  schema?: TSchema,
) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(`${typename}`),
    }),
    RefSchema,
    ...(schema ? [schema] : []),
  ])
}
