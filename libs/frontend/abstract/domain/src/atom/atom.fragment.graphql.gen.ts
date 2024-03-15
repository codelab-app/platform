import * as Types from '@codelab/shared/abstract/codegen'

import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { TagFragment } from '../tag/tag.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
import { TagFragmentDoc } from '../tag/tag.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type AtomFragment = {
  __typename: 'Atom'
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  api: InterfaceTypeFragment
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
  __typename: 'Atom'
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
    __typename
    api {
      ...InterfaceType
    }
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
    tags {
      ...Tag
    }
    type
  }
  ${InterfaceTypeFragmentDoc}
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
    __typename
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
