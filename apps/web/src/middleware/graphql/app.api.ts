import { getSdk } from '../graphql/app.endpoints.graphql.gen'
import { client } from './client'

export const appApi = getSdk(client)
