import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'

export const getErrors = <A>(v: t.Validation<A>): Array<string> => {
  return pipe(
    v,
    fold(
      (errors) => {
        /**
         * It appears that key in context is missing, do we have to set manually in codec?
         *
         * Seems to be extra work!
         */
        return errors.map((error) => {
          const keys = error.context.map(({ key }) => key).join('.')

          return `${keys} ${error.message}`
        })
      },
      () => ['no errors'],
    ),
  )
}
