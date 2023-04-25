import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/resource.endpoints.graphql.gen'

export const resourceApi = getSdk(client)
