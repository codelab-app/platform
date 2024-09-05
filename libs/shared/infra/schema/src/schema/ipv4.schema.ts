import { Kind, type TKind, Type } from '@sinclair/typebox'

export const TIpv4: TKind = {
  [Kind]: '@codelab/Ipv4',
}
export const Ipv4Schema = Type.String({
  format: 'ipv4',
})

/**
 * https://github.com/sinclairzx81/typebox/blob/master/example/formats/ipv4.ts
 */
const IPv4 =
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

export const IsIPv4 = (value: string): boolean => {
  return IPv4.test(value)
}
