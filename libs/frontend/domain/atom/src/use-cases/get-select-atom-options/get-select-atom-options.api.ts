import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from './get-select-atom-options.endpoints.graphql.gen'

export const getSelectAtomOptionsApi = getSdk(client)
