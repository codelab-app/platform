import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../../graphql/interface-form.endpoints.graphql.gen'

export const interfaceFormApi = getSdk(client)
