import * as Types from '@codelab/shared/abstract/codegen-v2'

export type Field_InterfaceTypeEdge_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type Field_InterfaceTypeFieldsRelationship_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type FieldFragment =
  | Field_InterfaceTypeEdge_Fragment
  | Field_InterfaceTypeFieldsRelationship_Fragment

export type InterfaceTypeEdgeFragment = {
  target: string
  source: string
} & Field_InterfaceTypeEdge_Fragment
