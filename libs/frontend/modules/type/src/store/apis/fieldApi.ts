import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../../graphql/field.endpoints.v2.1.graphql.gen'

export const fieldApi = getSdk(client)
