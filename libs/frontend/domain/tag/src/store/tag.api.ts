import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/tag.endpoints.graphql.gen'

export const tagApi = getSdk(client)
