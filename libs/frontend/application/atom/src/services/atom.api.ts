import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql/atom.endpoints.graphql.gen'

export const atomApi = getSdk(client)
