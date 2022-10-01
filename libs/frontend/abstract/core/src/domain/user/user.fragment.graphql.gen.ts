import * as Types from '@codelab/shared/abstract/codegen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { AppFragment, AppFragmentDoc } from '../app/app.fragment.graphql.gen'

export interface UserFragment {
  id: string
  username: string
  email: string
  auth0Id: string
  roles: Array<Types.Role>
  apps: Array<AppFragment>
}

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    username
    email
    auth0Id
    roles
    apps {
      ...App
    }
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
