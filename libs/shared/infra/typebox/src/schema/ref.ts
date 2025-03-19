import type { Static, TKind } from '@sinclair/typebox'

import { Kind, Type } from '@sinclair/typebox'
import { TypeSystemPolicy } from '@sinclair/typebox/system'

// https://github.com/sinclairzx81/typebox/issues/4
TypeSystemPolicy.ExactOptionalPropertyTypes = true

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
export const DiscriminatedRef = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(`${typename}`),
    }),
    Type.Object({
      // Add this for easier debugging
      name: Type.Optional(Type.String()),
    }),
    RefSchema,
  ])
}
