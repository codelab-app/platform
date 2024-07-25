import { getSdk as getCreateSdk } from './create-action.api.graphql.gen'
import { getSdk as getDeleteSdk } from './delete-action.api.graphql.gen'
import { getSdk as getGetSdk } from './get-action.api.graphql.gen'
import { getSdk as getUpdateSdk } from './update-action.api.graphql.gen'

export const getActionApi = getGetSdk()

export const createActionApi = getCreateSdk()

export const deleteActionApi = getDeleteSdk()

export const updateActionApi = getUpdateSdk()
