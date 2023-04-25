import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../../graphql/store.endpoints.graphql.gen'

export const storeApi = getSdk(client)
