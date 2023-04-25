import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from '../graphql/atom.endpoints.graphql.gen'

export const atomApi = getSdk(client)
