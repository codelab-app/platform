import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IEntity = Type.Object({
  id: Type.String(),
})

export type IEntity = Static<typeof IEntity>

/**
 * Allows us to know the subtype, we use optional since this matches with the OGM return type, and so we don't need to cast
 */
export const IMaybeDiscriminatedEntity = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Optional(Type.Literal(typename)),
    }),
    IEntity,
  ])
}

export type IMaybeDiscriminatedEntity<T extends string> = Static<
  ReturnType<typeof IMaybeDiscriminatedEntity<T>>
>

export const IDiscriminatedEntity = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(typename),
    }),
    IEntity,
  ])
}

export type IDiscriminatedEntity<T extends string> = Static<
  ReturnType<typeof IMaybeDiscriminatedEntity<T>>
>
