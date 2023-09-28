import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from './get-select-atom-options.endpoints.graphql.gen'

export const getSelectAtomOptionsApi = getSdk(client)
