import { OGM_TYPES } from '@codelab/backend/abstract/codegen'

export type IElementExport = Pick<
  OGM_TYPES.Element,
  'id' | 'name' | 'parent' | 'renderAtomType'
>
