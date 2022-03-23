import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Atom.endpoints.v2.1.graphql.gen'

export const atomApi = getSdk(client)
