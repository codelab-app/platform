import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/Atom.fragment.v2.1.graphql.gen'

export const atomApi = getSdk(client)
