import { Env } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(Env.graphql.graphqlApiOrigin)
