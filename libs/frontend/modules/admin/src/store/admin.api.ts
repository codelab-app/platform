import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Admin.endpoints.v2.1.graphql.gen'

export const adminApi = getSdk(client)
