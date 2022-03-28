import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/tag.endpoints.v2.1.graphql.gen'

export const tagApi = getSdk(client)
