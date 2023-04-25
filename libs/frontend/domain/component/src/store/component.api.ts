import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/component.endpoints.graphql.gen'

export const componentApi = getSdk(client)
