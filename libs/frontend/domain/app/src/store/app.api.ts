import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/app.endpoints.graphql.gen'

export const appApi = getSdk(client)
