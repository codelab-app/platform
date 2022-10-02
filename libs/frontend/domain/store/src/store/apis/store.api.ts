import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../../graphql/store.endpoints.graphql.gen'

export const storeApi = getSdk(client)
