import * as Types from '@codelab/shared/abstract/codegen'

import {
  TagFragment,
  TagPreviewFragment,
} from '../tag/tag.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  TagFragmentDoc,
  TagPreviewFragmentDoc,
} from '../tag/tag.fragment.graphql.gen'
export type AtomFragment = {
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  tags: Array<TagFragment>
  api: { id: string; name: string }
}

export type AtomPreviewFragment = {
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  tags: Array<TagPreviewFragment>
  api: { id: string; name: string }
}

export const AtomFragmentDoc = gql`
  fragment Atom on Atom {
    icon
    id
    name
    type
    tags {
      ...Tag
    }
    api {
      id
      name
    }
  }
  ${TagFragmentDoc}
`
export const AtomPreviewFragmentDoc = gql`
  fragment AtomPreview on Atom {
    icon
    id
    name
    type
    tags {
      ...TagPreview
    }
    api {
      id
      name
    }
  }
  ${TagPreviewFragmentDoc}
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
