import { graphqlApiOrigin } from '@codelab/shared/data'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(graphqlApiOrigin)
