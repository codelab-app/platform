import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from './get-select-atom-optionss.endpoints.graphql.gen'

export const getSelectAtomOptionsApi = getSdk(client)
