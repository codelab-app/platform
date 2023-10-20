import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from './tag.endpoints.graphql.gen'

export const tagApi = getSdk(client)
