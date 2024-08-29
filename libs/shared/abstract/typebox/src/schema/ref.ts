import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TRef = {
  [Kind]: '@codelab/Ref',
} as TKind

export const Ref = Type.Object({
  id: Type.String(),
})

export const DiscriminatedRef = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(`${typename}`),
    }),
    Ref,
  ])
}
