import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export type IElementExport = Pick<
  OGM_TYPES.Element,
  'id' | 'name' | 'parent' | 'renderAtomType'
>
