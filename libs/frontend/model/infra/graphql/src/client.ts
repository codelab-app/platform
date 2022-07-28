import { apiOrigin } from '@codelab/shared/data'
import { GraphQLClient } from 'graphql-request'

const endpoint = `${apiOrigin}/api/graphql`

export const client = new GraphQLClient(endpoint)
