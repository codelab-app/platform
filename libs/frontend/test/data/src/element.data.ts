import type { IElementDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { atomReactFragmentDto } from './atom.data'

export const elementDto: IElementDTO = {
  closestContainerNode: {
    id: v4(),
  },
  id: v4(),
  name: 'Body',
  props: {
    id: v4(),
  },
  renderType: {
    __typename: 'Atom',
    id: atomReactFragmentDto.id,
  },
}
