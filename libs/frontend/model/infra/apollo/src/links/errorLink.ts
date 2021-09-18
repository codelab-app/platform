import { onError } from '@apollo/client/link/error'

export const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation, response }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        const { message, locations, path, extensions } = graphQLError

        console.error(graphQLError)
        // console.log(
        //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        // )
      })
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  },
)
