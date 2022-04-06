import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../../graphql/interface-form.endpoints.graphql.gen'

export const interfaceFormApi = getSdk(client)
