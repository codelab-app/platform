import type { ApolloError } from 'apollo-server-micro'
import isObjectLike from 'lodash/isObjectLike'
import isString from 'lodash/isString'
import type { AsyncState } from 'react-use/lib/useAsyncFn'

export const extractErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: AsyncState<unknown> | string | ApolloError | Error | undefined | any,
): string => {
  if (!e) {
    return ''
  }

  console.error(JSON.stringify(e))

  if (isString(e)) {
    return e
  }

  if (Array.isArray(e)) {
    return e.map(extractErrorMessage).join('\n')
  }

  if (isObjectLike(e)) {
    if (e?.error) {
      return extractErrorMessage(e.error)
    }

    if (e.errors) {
      return extractErrorMessage(e.errors)
    }

    //
    if (e.response) {
      return extractErrorMessage(e.response)
    }

    //
    // if (e.data) {
    //   return extractErrorMessage(e.data)
    // }
    //
    if (e.message) {
      return extractErrorMessage(e.message)
    }

    console.log('eeee', e)

    if (e.extensions?.response) {
      return `[${e.extensions.response.message}]: ${e.extensions.response.error}`
      // return e.graphQLErrors[0].extensions
      //   ? `[${e.message}]: ${
      //       (e.graphQLErrors[0].extensions.response as any)?.error
      //     }`
      //   : e.message
    }
  }

  return JSON.stringify(e)
}
