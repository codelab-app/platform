import type { ApolloError } from 'apollo-server-micro'
import isObjectLike from 'lodash/isObjectLike'
import isString from 'lodash/isString'
import type { AsyncState } from 'react-use/lib/useAsyncFn'

export const extractErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AsyncState<unknown> | string | ApolloError | Error | undefined | any,
): string => {
  if (!error) {
    return ''
  }

  console.error(JSON.stringify(error))

  if (isString(error)) {
    return error
  }

  if (Array.isArray(error)) {
    return error.map(extractErrorMessage).join('\n')
  }

  if (isObjectLike(error)) {
    if (error.error) {
      return extractErrorMessage(error.error)
    }

    if (error.errors) {
      return extractErrorMessage(error.errors)
    }

    //
    if (error.response) {
      return extractErrorMessage(error.response)
    }

    //
    // if (e.data) {
    //   return extractErrorMessage(e.data)
    // }
    //
    if (error.message) {
      return extractErrorMessage(error.message)
    }

    if (error.extensions?.response) {
      return `[${error.extensions.response.message}]: ${error.extensions.response.error}`
      // return e.graphQLErrors[0].extensions
      //   ? `[${e.message}]: ${
      //       (e.graphQLErrors[0].extensions.response as any)?.error
      //     }`
      //   : e.message
    }
  }

  return JSON.stringify(error)
}
