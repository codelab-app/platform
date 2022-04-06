import { ApolloError } from '@apollo/client'
import { isObjectLike, isString } from 'lodash'

export const extractErrorMessage = (e: any): string => {
  if (!e) {
    return ''
  }

  console.log(JSON.stringify(e))

  if (isString(e)) {
    return e
  }

  if (Array.isArray(e)) {
    return e.map(extractErrorMessage).join('\n')
  }

  if (isObjectLike(e)) {
    if (e.error) {
      return extractErrorMessage(e.error)
    }

    if (e.errors) {
      return extractErrorMessage(e.errors)
    }

    if (e.response) {
      return extractErrorMessage(e.response)
    }

    if (e.data) {
      return extractErrorMessage(e.data)
    }

    if (e.message) {
      return extractErrorMessage(e.message)
    }

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
  }

  return JSON.stringify(e)
}
