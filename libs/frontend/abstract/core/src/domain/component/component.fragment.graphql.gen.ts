import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type ComponentFragment = {
  id: string
  name: string
  rootElement: { id: string; name: string }
  owner: OwnerFragment
  api: InterfaceTypeFragment
  props: PropFragment
  childrenContainerElement: { id: string }
  store: StoreFragment
}

export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    id
    name
    rootElement {
      id
      name
    }
    owner {
      ...Owner
    }
    api {
      ...InterfaceType
    }
    props {
      ...Prop
    }
    childrenContainerElement {
      id
    }
    store {
      ...Store
    }
  }
  ${OwnerFragmentDoc}
  ${InterfaceTypeFragmentDoc}
  ${PropFragmentDoc}
  ${StoreFragmentDoc}
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
