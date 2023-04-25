import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/app.endpoints.graphql.gen'

export const appApi = getSdk(client)
