import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Resource.endpoints.v2.1.graphql.gen'

export const resourceApi = getSdk(client)
