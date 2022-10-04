import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/atom.endpoints.graphql.gen'

export const atomApi = getSdk(client)
