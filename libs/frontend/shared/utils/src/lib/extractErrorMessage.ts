import { ApolloError } from '@apollo/client'
import { isObjectLike, isString } from 'lodash'

export const extractErrorMessage = (e: any): string => {
  if (!e) {
    return ''
  }

  if (isString(e)) {
    return e
  }

  if (isObjectLike(e)) {
    if (e instanceof ApolloError) {
      return e.graphQLErrors[0].extensions
        ? `[${e.message}]: ${
            (e.graphQLErrors[0].extensions.response as any)?.error
          }`
        : e.message
    }

    if (e.extensions) {
      return e.extensions
        ? `[${e.extensions.response.message}]: ${e.extensions.response.error}`
        : e.message
    }

    if (e.message) {
      return e.message
    }

    if (e.error) {
      return extractErrorMessage(e.error)
    }

    if (e.data) {
      return extractErrorMessage(e.data)
    }
  }

  return JSON.stringify(e)
}
