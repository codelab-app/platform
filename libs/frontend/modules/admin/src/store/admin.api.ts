import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/admin.endpoints.v2.1.graphql.gen'

export const adminApi = getSdk(client)
