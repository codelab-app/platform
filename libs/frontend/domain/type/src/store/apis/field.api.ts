import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../../graphql/field.endpoints.graphql.gen'

export const fieldApi = getSdk(client)
