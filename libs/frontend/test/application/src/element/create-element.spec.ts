import type { IElementDto } from '@codelab/shared-abstract-core'

import { createTestStore } from '@codelab/frontend-infra-mobx-store'
import {
  atomReactFragmentDto,
  elementDto,
  pageDto,
} from '@codelab/frontend-test-data'
import { v4 } from 'uuid'

describe('Create element', () => {
  const { rootStore } = createTestStore()
  const { elementDomainService, pageDomainService } = rootStore.domainStore

  const rootElementDto: IElementDto = {
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
    renderType: atomReactFragmentDto,
  } as const

  pageDomainService.hydrate(pageDto)

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
