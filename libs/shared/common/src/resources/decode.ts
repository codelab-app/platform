import { fold, left } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { Errors, Validation } from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { Result } from '../data'
import { DecodeError } from '../errors'

export const decode = <A, O = A, I = unknown>(
  data: I,
  codec: t.Type<A, O, I>,
): Result<A> => {
  return pipe<I, Validation<A>, Result<A>>(
    data,
    codec.decode,
    fold<Errors, A, Result<A>>(
      (errors) => {
        throw new DecodeError(PathReporter.report(left(errors)).join('\n'))
      },
      (a) => {
        return {
          data: a,
        }
      },
    ),
  )
}
