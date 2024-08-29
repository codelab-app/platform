import { type Kind, type TSchema, Type } from '@sinclair/typebox'

export interface TIpv4 extends TSchema {
  [Kind]: '@codelab/Ipv4'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static: any
}
export const Ipv4Schema = Type.String({
  format: 'ipv4',
})
