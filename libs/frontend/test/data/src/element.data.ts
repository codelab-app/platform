import type {
  ICreateElementDto,
  IElementDto,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { atomReactFragmentDto } from './atom.data'

export const elementDto: ICreateElementDto = {
  closestContainerNode: {
    id: v4(),
  },
  id: v4(),
  name: 'Body',
  props: {
    data: '{}',
    id: v4(),
  },
  renderType: {
    __typename: 'Atom',
    id: atomReactFragmentDto.id,
  },
}
