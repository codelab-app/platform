import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export interface ExistingData {
  api: { [interfaceTypeName: string]: OGM_TYPES.InterfaceType }
  atoms: { [atomName: string]: OGM_TYPES.Atom }
  atomsById: { [atomId: string]: OGM_TYPES.Atom }
  fields: { [fieldCompositeKey: string]: OGM_TYPES.Field }
  tags: { [tagName: string]: OGM_TYPES.Tag }
  types: { [typeName: string]: OGM_TYPES.IBaseType }
  typesById: { [typeName: string]: OGM_TYPES.IBaseType }
}
