import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from './app.endpoints.graphql.gen'

export const appApi = getSdk(client)
