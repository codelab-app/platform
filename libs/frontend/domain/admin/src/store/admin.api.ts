import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/admin.endpoints.graphql.gen'

export const adminApi = getSdk(client)
