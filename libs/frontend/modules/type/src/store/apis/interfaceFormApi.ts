import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../../graphql/interface-form.endpoints.v2.1.graphql.gen'

export const interfaceFormApi = getSdk(client)
