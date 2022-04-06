import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/action.endpoints.graphql.gen'

export const actionApi = getSdk(client)
