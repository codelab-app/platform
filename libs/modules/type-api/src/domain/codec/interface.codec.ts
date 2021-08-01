import * as t from 'io-ts'
import { FieldC } from './field.codec'

export const InterfaceC = t.type({
  name: t.string,
  fields: t.array(FieldC),
})

export type InterfaceC = t.TypeOf<typeof InterfaceC>
