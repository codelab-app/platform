import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/user.endpoints.graphql.gen'

export const userApi = getSdk(client)
