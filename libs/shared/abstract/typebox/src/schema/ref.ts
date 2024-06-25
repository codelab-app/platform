import { Type } from '@sinclair/typebox'

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
