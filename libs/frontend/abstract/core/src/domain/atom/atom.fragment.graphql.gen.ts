import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { TagFragment } from '../tag/tag.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import { TagFragmentDoc } from '../tag/tag.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
export type AtomFragment = {
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  owner: OwnerFragment
  tags: Array<TagFragment>
  api: InterfaceTypeFragment
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
}

export type RenderAtomFragment = {
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
}

export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    icon
    id
    name
    type
    owner {
      ...Owner
    }
    tags {
      ...Tag
    }
    api {
      ...InterfaceType
    }
    suggestedChildren {
      id
      name
      type
    }
    requiredParents {
      id
      name
      type
    }
    externalCssSource
    externalJsSource
    externalSourceType
  }
  ${OwnerFragmentDoc}
  ${TagFragmentDoc}
  ${InterfaceTypeFragmentDoc}
`
export const RenderAtomFragmentDoc = gql`
  fragment RenderAtom on Atom {
    icon
    id
    name
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
