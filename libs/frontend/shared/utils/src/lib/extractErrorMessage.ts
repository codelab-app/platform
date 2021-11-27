import { ApolloError } from '@apollo/client'

export const extractErrorMessage = (e: any): string => {
  if (!e) {
    return ''
  }

  if (typeof e === 'string') {
    return e
  }

  if (typeof e === 'object') {
    if (e instanceof ApolloError) {
      return e.graphQLErrors[0].extensions
        ? `[${e.message}]: ${e.graphQLErrors[0].extensions.response.error}`
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
