import { getEnv } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(getEnv().endpoint.graphqlApiProxyUrl)
