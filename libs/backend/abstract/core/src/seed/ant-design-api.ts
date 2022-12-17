import type { OGM_TYPES } from '@codelab/backend/abstract/codegen'

export interface ExistingData {
  atoms: { [atomName: string]: OGM_TYPES.Atom }
  atomsById: { [atomId: string]: OGM_TYPES.Atom }
  tags: { [tagName: string]: OGM_TYPES.Tag }
  fields: { [fieldCompositeKey: string]: OGM_TYPES.Field }
  api: { [interfaceTypeName: string]: OGM_TYPES.InterfaceType }
  types: { [typeName: string]: OGM_TYPES.IBaseType }
  typesById: { [typeName: string]: OGM_TYPES.IBaseType }
}
