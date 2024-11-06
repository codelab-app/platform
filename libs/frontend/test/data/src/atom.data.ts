import type { IAtomDto } from '@codelab/shared/abstract/core'

import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

import { userDto } from './user.data'

export const atomReactFragmentDto: IAtomDto = {
  __typename: IElementRenderTypeKind.Atom,
  api: {
    id: v4(),
  },
  id: v4(),
  name: IAtomType.ReactFragment,
  owner: userDto,
  requiredParents: [],
  suggestedChildren: [],
  tags: [],
  type: IAtomType.ReactFragment,
}
