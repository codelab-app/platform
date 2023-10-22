import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from './model/node-type.interface'

export const IPropDTO = Type.Object({
  api: Typebox.Nullish(IRef),
  data: Type.String(),
  id: Type.String(),
})

export type IPropDTO = Static<typeof IPropDTO>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IPropData = Record<string, any>

export const IProp = Type.Object({
  // api: Typebox.Nullish(IEntity),
  data: Type.Any(),
  id: Type.String(),
})

export type IProp = Static<typeof IProp>

// export interface IProp {
//   id: string
//   values: IPropData
// }
