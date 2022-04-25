import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/resource.endpoints.graphql.gen'

export const resourceApi = getSdk(client)
