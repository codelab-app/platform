import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/App.endpoints.v2.1.graphql.gen'

export const appApi = getSdk(client)
