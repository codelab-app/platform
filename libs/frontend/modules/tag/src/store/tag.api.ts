import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/tag.endpoints.graphql.gen'

export const tagApi = getSdk(client)
