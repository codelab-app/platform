import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type ComponentFragment = {
  __typename: 'Component'
  id: string
  name: string
  api: { id: string }
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string }
  store: StoreFragment
}

export type ComponentDevelopmentFragment = {
  __typename: 'Component'
  id: string
  name: string
  api: InterfaceTypeFragment
  elements: Array<ElementFragment>
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string; name: string }
  store: StoreFragment
  elements: Array<ElementFragment>
}

export type ComponentProductionFragment = {
  id: string
  name: string
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string; name: string }
  store: StoreFragment
}

export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    __typename
    api {
      id
    }
    id
    name
    owner {
      ...Owner
    }
    props {
      ...Prop
    }
    rootElement {
      id
    }
    store {
      ...Store
    }
  }
  ${OwnerFragmentDoc}
  ${PropFragmentDoc}
  ${StoreFragmentDoc}
`
export const ComponentDevelopmentFragmentDoc = gql`
  fragment ComponentDevelopment on Component {
    __typename
    api {
      ...InterfaceType
    }
    elements {
      ...Element
    }
    id
    name
    owner {
      ...Owner
    }
    props {
      ...Prop
    }
    rootElement {
      id
      name
    }
    store {
      ...Store
    }
    elements {
      ...Element
    }
  }
  ${InterfaceTypeFragmentDoc}
  ${ElementFragmentDoc}
  ${OwnerFragmentDoc}
  ${PropFragmentDoc}
  ${StoreFragmentDoc}
  ${ElementFragmentDoc}
`
export const ComponentProductionFragmentDoc = gql`
  fragment ComponentProduction on Component {
    id
    name
    owner {
      ...Owner
    }
    props {
      ...Prop
    }
    rootElement {
      id
      name
    }
    store {
      ...Store
    }
  }
  ${OwnerFragmentDoc}
  ${PropFragmentDoc}
  ${StoreFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
