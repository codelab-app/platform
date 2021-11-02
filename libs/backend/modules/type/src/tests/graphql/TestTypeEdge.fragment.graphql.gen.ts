import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestFieldTypeEdgeFragment = {
  description?: Types.Maybe<string>
  id: string
  key: string
  name?: Types.Maybe<string>
  source: string
  target: string
}

export type TestTypeEdge_BaseTypeEdge_Fragment = {
  source: string
  target: string
}

export type TestTypeEdge_FieldTypeEdge_Fragment = {
  source: string
  target: string
} & TestFieldTypeEdgeFragment

export type TestTypeEdgeFragment =
  | TestTypeEdge_BaseTypeEdge_Fragment
  | TestTypeEdge_FieldTypeEdge_Fragment

export const TestFieldTypeEdgeFragmentDoc = gql`
  fragment TestFieldTypeEdge on FieldTypeEdge {
    description
    id
    key
    name
    source
    target
  }
`
export const TestTypeEdgeFragmentDoc = gql`
  fragment TestTypeEdge on TypeEdge {
    source
    target
    ... on FieldTypeEdge {
      ...TestFieldTypeEdge
    }
  }
  ${TestFieldTypeEdgeFragmentDoc}
`
