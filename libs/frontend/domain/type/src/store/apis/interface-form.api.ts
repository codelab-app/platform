import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../../graphql/interface-form.endpoints.graphql.gen'

export const interfaceFormApi = getSdk(client)
