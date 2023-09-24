import * as Types from '@codelab/shared/abstract/codegen'

import {
  AppFragment,
  AppPreviewFragment,
} from '../app/app.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  AppFragmentDoc,
  AppPreviewFragmentDoc,
} from '../app/app.fragment.graphql.gen'
export type UserFragment = {
  auth0Id: string
  email: string
  id: string
  roles?: Array<Types.Role> | null
  username: string
  apps: Array<AppFragment>
}

export const UserFragmentDoc = gql`
  fragment User on User {
    apps {
      ...App
    }
    auth0Id
    email
    id
    roles
    username
  }
  ${AppFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
