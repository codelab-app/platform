import { AtomFragment } from '@codelab/shared/abstract/codegen'
import { IAtomDTO, IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const atomReactFragmentDto: IAtomDTO = {
  id: v4(),
  name: IAtomType.ReactFragment,
  type: IAtomType.ReactFragment,
  api: {
    id: v4(),
    __typename: 'InterfaceType',
  },
  requiredParents: [],
  suggestedChildren: [],
  tags: [],
}
