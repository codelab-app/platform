import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/component.endpoints.v2.1.graphql.gen'

export const componentApi = getSdk(client)
