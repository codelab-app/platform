import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export interface ExistingData {
  atoms: { [atomName: string]: OGM_TYPES.Atom }
  atomsById: { [atomId: string]: OGM_TYPES.Atom }
  tags: { [tagName: string]: OGM_TYPES.Tag }
  fields: { [fieldCompositeKey: string]: OGM_TYPES.Field }
  api: { [interfaceTypeName: string]: OGM_TYPES.InterfaceType }
}
