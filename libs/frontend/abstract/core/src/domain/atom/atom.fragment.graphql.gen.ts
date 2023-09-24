import * as Types from '@codelab/shared/abstract/codegen'

import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { TagFragment } from '../tag/tag.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import { TagFragmentDoc } from '../tag/tag.fragment.graphql.gen'
export type AtomFragment = {
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  api: InterfaceTypeFragment
  owner: OwnerFragment
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
  tags: Array<TagFragment>
}

export type AtomDevelopmentFragment = {
  __typename: 'Atom'
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  api: InterfaceTypeFragment
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
  tags: Array<TagFragment>
}

export type AtomProductionFragment = {
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
}

export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    api {
      ...InterfaceType
    }
    externalCssSource
    externalJsSource
    externalSourceType
    icon
    id
    name
    owner {
      ...Owner
    }
    requiredParents {
      id
      name
      type
    }
    suggestedChildren {
      id
      name
      type
    }
    tags {
      ...Tag
    }
    type
  }
  ${InterfaceTypeFragmentDoc}
  ${OwnerFragmentDoc}
  ${TagFragmentDoc}
`
export const AtomDevelopmentFragmentDoc = gql`
  fragment AtomDevelopment on Atom {
    __typename
    api {
      ...InterfaceType
    }
    icon
    id
    name
    requiredParents {
      id
      name
      type
    }
    suggestedChildren {
      id
      name
      type
    }
    tags {
      ...Tag
    }
    type
  }
  ${InterfaceTypeFragmentDoc}
  ${TagFragmentDoc}
`
export const AtomProductionFragmentDoc = gql`
  fragment AtomProduction on Atom {
    externalCssSource
    externalJsSource
    externalSourceType
    icon
    id
    name
    requiredParents {
      id
      name
      type
    }
    suggestedChildren {
      id
      name
      type
    }
    type
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
