import * as Types from '@codelab/shared/abstract/codegen'

import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen'
export type AuthGuardFragment = {
  id: string
  name: string
  config: PropFragment
  resource: ResourceFragment
}

export const AuthGuardFragmentDoc = gql`
  fragment AuthGuard on AuthGuard {
    id
    name
    config {
      ...Prop
    }
    resource {
      ...Resource
    }
  }
  ${PropFragmentDoc}
  ${ResourceFragmentDoc}
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
