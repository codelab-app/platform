import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export enum INodeType {
  Atom = 'Atom',
  InterfaceType = 'InterfaceType',
}

export const IRef = Type.Object({
  id: Type.String(),
})
export type IRef = Static<typeof IRef>

export const IDiscriminatedRef = <T extends string>(typename: T) => {
  return Type.Composite([
    Type.Object({
      __typename: Type.Literal(`${typename}`),
    }),
    IRef,
  ])
}

export type IDiscriminatedRef<T extends string> = Static<
  ReturnType<typeof IDiscriminatedRef<T>>
>

// export interface IAggregateRoot {
//   //
// }

// export interface IValueObject {
//   //
// }
