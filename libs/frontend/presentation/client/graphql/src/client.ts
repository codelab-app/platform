import { graphqlApiOrigin } from '@codelab/shared/infra/config'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(graphqlApiOrigin)
