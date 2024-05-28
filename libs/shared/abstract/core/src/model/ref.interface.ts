import { type Static, Type } from '@sinclair/typebox'

export const IRef = Type.Object({
  id: Type.String(),
})
export type IRef = Static<typeof IRef>

export const IDiscriminatedRef = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(typename),
    }),
    IRef,
  ])
}

export type IDiscriminatedRef<T extends string> = Static<
  ReturnType<typeof IDiscriminatedRef<T>>
>
