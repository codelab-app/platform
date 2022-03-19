import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Store.endpoints.v2.1.graphql.gen'

export const storeApi = getSdk(client)
