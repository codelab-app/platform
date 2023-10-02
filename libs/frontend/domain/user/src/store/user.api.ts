import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/user.endpoints.graphql.gen'

export const userApi = getSdk(client)
