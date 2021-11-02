import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type FieldTypeEdgeFragment = {
  description?: Types.Maybe<string>
  id: string
  key: string
  name?: Types.Maybe<string>
  source: string
  target: string
}

export type TypeEdge_BaseTypeEdge_Fragment = { source: string; target: string }

export type TypeEdge_FieldTypeEdge_Fragment = {
  source: string
  target: string
} & FieldTypeEdgeFragment

export type TypeEdgeFragment =
  | TypeEdge_BaseTypeEdge_Fragment
  | TypeEdge_FieldTypeEdge_Fragment

export const FieldTypeEdgeFragmentDoc = gql`
  fragment FieldTypeEdge on FieldTypeEdge {
    description
    id
    key
    name
    source
    target
  }
`
export const TypeEdgeFragmentDoc = gql`
  fragment TypeEdge on TypeEdge {
    source
    target
    source
    target
    ... on FieldTypeEdge {
      ...FieldTypeEdge
    }
  }
  ${FieldTypeEdgeFragmentDoc}
`
