import { atomRef } from '@codelab/frontend/abstract/core'
import {
  atomReactFragmentDto,
  elementDto,
  pageDto,
  userDto,
} from '@codelab/frontend/test/data'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { isRefOfType } from 'mobx-keystone'
import { v4 } from 'uuid'
import { createTestRootStore } from './root-store'

const buttonElement: IElementDTO = {
  closestContainerNode: {
    id: v4(),
  },
  id: v4(),
  name: 'Row Div',
  props: {
    data: '{}',
    id: v4(),
  },
  renderType: {
    __typename: 'Atom',
    id: atomReactFragmentDto.id,
  },
}

describe('Element getters', () => {
  const { atomService, elementService, pageService } =
    createTestRootStore(userDto)

  const { createElementService } = elementService

  pageService.add({ ...pageDto, rootElement: { id: elementDto.id } })
  // createElementService.createElementAsFirstChild(buttonElement)

  it('should add a render type to element', () => {
    elementDto.renderType.id = atomReactFragmentDto.id

    elementService.add(elementDto)
    atomService.add(atomReactFragmentDto)

    const element = elementService.elements.get(elementDto.id)
    const renderType = element?.renderType

    expect(renderType?.id).toBe(atomReactFragmentDto.id)
    expect(renderType).toBeDefined()
    expect(isRefOfType(renderType!, atomRef)).toBeTruthy()
  })
})
