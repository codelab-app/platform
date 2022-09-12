import { GraphQLClient } from 'graphql-request'
import { getSdk } from './app.endpoints.graphql.gen'
import { client } from './client'

export const appApi = getSdk(client as GraphQLClient)
