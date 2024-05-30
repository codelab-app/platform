import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'

export const PropDtoSchema = Type.Object({
  api: Typebox.Nullish(Typebox.Ref),
  data: Type.String(),
  id: Type.String(),
})

export type IPropDto = Static<typeof PropDtoSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IPropData = Record<string, any>

export const PropSchema = Type.Object({
  // api: Typebox.Nullish(IEntity),
  data: Type.Any(),
  id: Type.String(),
})

export type IProp = Static<typeof PropSchema>

// export interface IProp {
//   id: string
//   values: IPropData
// }
