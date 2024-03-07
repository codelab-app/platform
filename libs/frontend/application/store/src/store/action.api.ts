import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk as getCreateSdk } from '../graphql/create-action.endpoints.graphql.gen'
import { getSdk as getDeleteSdk } from '../graphql/delete-action.endpoints.graphql.gen'
import { getSdk as getGetSdk } from '../graphql/get-action.endpoints.graphql.gen'
import { getSdk as getUpdateSdk } from '../graphql/update-action.endpoints.graphql.gen'

export const getActionApi = getGetSdk(graphqlClient)

export const createActionApi = getCreateSdk(graphqlClient)

export const deleteActionApi = getDeleteSdk(graphqlClient)

export const updateActionApi = getUpdateSdk(graphqlClient)
