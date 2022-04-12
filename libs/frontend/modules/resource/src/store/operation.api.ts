import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/operation.endpoints.graphql.gen'

export const operationApi = getSdk(client)
