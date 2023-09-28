import { IElementDTO } from '@codelab/shared/abstract/core'
import { ModelCreationData } from 'mobx-keystone'
import { v4 } from 'uuid'

export const elementDto: IElementDTO = {
  id: v4(),
  name: 'Body',
  closestContainerNode: {
    id: v4(),
  },
  props: {
    id: v4(),
  },
  renderType: {
    id: v4(),
    __typename: 'Atom',
  },
}
