import { createTestRootStore } from '@codelab/frontend/domain/element'
import {
  appDto,
  atomReactFragmentDto,
  elementDto,
  pageDto,
} from '@codelab/frontend/test/data'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

describe('Create element', () => {
  const { appDomainService, elementDomainService } = createTestRootStore()
  const app = appDomainService.hydrate(appDto)

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

  app.addPageInCache(pageDto)

  const rootElement = elementDomainService.hydrate(rootElementDto)

  it('can create element as first child', async () => {
    const firstChild = await elementDomainService.addTreeNode(firstChildDto)

    expect(firstChild.parentElement?.maybeCurrent).toBe(rootElement)
  })

  it('should compute isRoot', async () => {
    const firstChild = await elementDomainService.addTreeNode(firstChildDto)

    expect(rootElement.isRoot).toBeTruthy()

    expect(firstChild.isRoot).toBeFalsy()
  })
})
