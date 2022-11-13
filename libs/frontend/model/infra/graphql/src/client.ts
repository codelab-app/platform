import { graphqlApiOrigin } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(graphqlApiOrigin)
