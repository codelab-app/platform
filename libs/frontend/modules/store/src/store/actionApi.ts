import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Action.endpoints.v2.1.graphql.gen'

export const actionApi = getSdk(client)
