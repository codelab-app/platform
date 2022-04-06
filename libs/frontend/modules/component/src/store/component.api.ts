import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/component.endpoints.graphql.gen'

export const componentApi = getSdk(client)
