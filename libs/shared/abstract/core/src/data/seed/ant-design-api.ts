import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}

export type TypeRef = {
  existingId: string
} | null

type AtomName = string
type AtomId = string
type TagName = string
type InterfaceTypeName = string

export interface ExistingData {
  atoms: Map<AtomName, OGM_TYPES.Atom>
  atomsById: Map<AtomId, OGM_TYPES.Atom>
  tags: Map<TagName, OGM_TYPES.Tag>
  api: Map<InterfaceTypeName, OGM_TYPES.InterfaceType>
}
