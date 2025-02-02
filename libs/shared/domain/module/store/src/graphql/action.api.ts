import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk as getCreateSdk } from './create-action.api.graphql.api.gen'
import {
  CreateApiActions,
  CreateCodeActions,
} from './create-action.api.graphql.web.gen'
import { getSdk as getDeleteSdk } from './delete-action.api.graphql.api.gen'
import {
  DeleteApiActions,
  DeleteCodeActions,
} from './delete-action.api.graphql.web.gen'
import { getSdk as getFindSdk } from './get-action.api.graphql.api.gen'
import { GetActions } from './get-action.api.graphql.web.gen'
import { getSdk as getUpdateSdk } from './update-action.api.graphql.api.gen'
import {
  UpdateApiActions,
  UpdateCodeActions,
} from './update-action.api.graphql.web.gen'

export const actionCreateServerActions = {
  CreateApiActions,
  CreateCodeActions,
}

export const actionUpdateServerActions = {
  UpdateApiActions,
  UpdateCodeActions,
}

export const actionDeleteServerActions = {
  DeleteApiActions,
  DeleteCodeActions,
}

export const actionGetServerActions = {
  GetActions,
}

export const actionCreateApi = () => getCreateSdk(graphqlClient)

export const actionUpdateApi = () => getUpdateSdk(graphqlClient)

export const actionDeleteApi = () => getDeleteSdk(graphqlClient)

export const actionFindApi = () => getFindSdk(graphqlClient)
