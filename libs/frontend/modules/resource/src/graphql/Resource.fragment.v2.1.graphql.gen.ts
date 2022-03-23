import * as Types from '@codelab/shared/abstract/codegen-v2'

import { AtomFragment } from '../../../atom/src/graphql/Atom.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { AtomFragmentDoc } from '../../../atom/src/graphql/Atom.fragment.v2.1.graphql.gen'
export type ResourceFragment = {
  __typename: 'Resource'
  id: string
  name: string
  atom: AtomFragment
}

export const ResourceFragmentDoc = gql`
  fragment Resource on Resource {
    __typename
    id
    name
    atom {
      ...Atom
    }
  }
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
