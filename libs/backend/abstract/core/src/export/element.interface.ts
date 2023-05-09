import type { Element } from '@codelab/backend/abstract/codegen'

export type IElementExport = Pick<
  Element,
  'id' | 'name' | 'parent' | 'renderAtomType'
>
