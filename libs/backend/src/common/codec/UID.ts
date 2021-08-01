import * as t from 'io-ts'

const regex = /^0x[\da-f]/i

export interface UIDBrand {
  readonly UID: unique symbol
}

export type UID = t.Branded<string, UIDBrand>

/**
 * @example
 * import { UUID } from 'io-ts-types/lib/UUID'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(UUID.decode('00000000-0000-0000-0000-000000000000'), right('00000000-0000-0000-0000-000000000000'))
 * assert.deepStrictEqual(PathReporter.report(UUID.decode('not a uuid')), ['Invalid value "not a uuid" supplied to : UUID'])
 *
 * @since 0.4.6
 */
export const UID = t.brand(
  t.string,
  (s: string): s is UID => regex.test(s),
  'UID',
)
