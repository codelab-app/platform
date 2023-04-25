import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../../graphql/field.endpoints.graphql.gen'

export const fieldApi = getSdk(client)
