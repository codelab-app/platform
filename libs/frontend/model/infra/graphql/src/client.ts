import { graphqlApiOrigin } from '@codelab/shared/env'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(graphqlApiOrigin)
