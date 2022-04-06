import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/admin.endpoints.graphql.gen'

export const adminApi = getSdk(client)
