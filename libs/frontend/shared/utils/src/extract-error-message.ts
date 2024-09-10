import type { ApolloError } from '@apollo/client'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import { isObjectType, isString } from 'remeda'

export const extractErrorMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: ApolloError | AsyncState<unknown> | Error | any | string | undefined,
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

  if (isObjectType(error)) {
    if ('error' in error) {
      return extractErrorMessage(error.error)
    }

    if ('errors' in error) {
      return extractErrorMessage(error.errors)
    }

    if ('response' in error) {
      return extractErrorMessage(error.response)
    }

    //
    // if (e.data) {
    //   return extractErrorMessage(e.data)
    // }
    //
    if ('message' in error) {
      return extractErrorMessage(error.message)
    }

    if ('extensions' in error) {
      return extractErrorMessage(error)
      // return `[${error.extensions.response.message}]: ${error.extensions.response.error}`
      // return e.graphQLErrors[0].extensions
      //   ? `[${e.message}]: ${
      //       (e.graphQLErrors[0].extensions.response as any)?.error
      //     }`
      //   : e.message
    }
  }

  return JSON.stringify(error)
}
