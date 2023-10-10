import { createTestRootStore } from '@codelab/frontend/domain/element'
import {
  atomReactFragmentDto,
  elementDto,
  pageDto,
  userDto,
} from '@codelab/frontend/test/data'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

describe('Create element', () => {
  const { elementService, pageService } = createTestRootStore(userDto)

  const rootElementDto: IElementDTO = {
    ...elementDto,
    page: { id: pageDto.id },
  }

  const firstChildDto = {
    closestContainerNode: {
      id: v4(),
    },
    id: v4(),
    name: 'Body',
    parentElement: {
      id: rootElementDto.id,
    },
    props: {
      data: '{}',
      id: v4(),
    },
    renderType: {
      __typename: 'Atom',
      id: atomReactFragmentDto.id,
    },
  } as const

  pageService.add(pageDto)

  const rootElement = elementService.add(rootElementDto)

  it('can create element as first child', async () => {
    const firstChild = await elementService.createElement(firstChildDto)

    expect(firstChild.parentElement?.maybeCurrent).toBe(rootElement)
  })

  it('should compute isRoot', async () => {
    const firstChild = await elementService.createElement(firstChildDto)

    expect(rootElement.isRoot).toBeTruthy()

    expect(firstChild.isRoot).toBeFalsy()
  })
})
