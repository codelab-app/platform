import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk as getCreateSdk } from '../../graphql/create-action.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../../graphql/delete-action.endpoints.graphql.gen'
import { getSdk as getGetSdk } from '../../graphql/get-action.endpoints.graphql.gen'
import { getSdk as getUpdateSdk } from '../../graphql/update-action.endpoints.graphql.gen'

export const getActionApi = getGetSdk(client)

export const createActionApi = getCreateSdk(client)
export const deleteActionApi = getDeleteSdk(client)
export const updateActionApi = getUpdateSdk(client)
