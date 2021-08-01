import * as t from 'io-ts'

export const FieldC = t.type({
  type: t.string,
  key: t.string,
  name: t.string,
})

export type FieldC = t.TypeOf<typeof FieldC>
