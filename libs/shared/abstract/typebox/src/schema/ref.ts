import { Type } from '@sinclair/typebox'

export const Ref = () =>
  Type.Object({
    id: Type.String(),
  })
