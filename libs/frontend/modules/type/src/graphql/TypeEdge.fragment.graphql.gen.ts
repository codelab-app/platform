import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type FieldTypeEdgeFragment = {
  description?: string | null | undefined
  id: string
  key: string
  name?: string | null | undefined
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
