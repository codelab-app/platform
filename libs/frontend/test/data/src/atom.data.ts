import type { IAtomDTO } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const atomReactFragmentDto: IAtomDTO = {
  __typename: IElementRenderTypeKind.Atom,
  api: {
    id: v4(),
  },
  id: v4(),
  name: IAtomType.ReactFragment,
  requiredParents: [],
  suggestedChildren: [],
  tags: [],
  type: IAtomType.ReactFragment,
}
