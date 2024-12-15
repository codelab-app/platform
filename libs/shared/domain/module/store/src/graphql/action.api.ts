import type { IRef } from '@codelab/shared/abstract/core'

import { graphqlClient } from '@codelab/shared/infra/gql-client'

import { getSdk as getCreateSdk } from './create-action.api.graphql.api.gen'
import { getSdk as getDeleteSdk } from './delete-action.api.graphql.api.gen'
import { getSdk as getFindSdk } from './get-action.api.graphql.api.gen'
import { getSdk as getUpdateSdk } from './update-action.api.graphql.api.gen'

export const actionCreateServerActions = () =>
  import('./create-action.api.graphql.web.gen')

export const actionUpdateServerActions = () =>
  import('./update-action.api.graphql.web.gen')

export const actionDeleteServerActions = () =>
  import('./delete-action.api.graphql.web.gen')

export const actionCreateApi = () => getCreateSdk(graphqlClient)

export const actionUpdateApi = () => getUpdateSdk(graphqlClient)

export const actionDeleteApi = () => getDeleteSdk(graphqlClient)

export const actionFindApi = () => getFindSdk(graphqlClient)
