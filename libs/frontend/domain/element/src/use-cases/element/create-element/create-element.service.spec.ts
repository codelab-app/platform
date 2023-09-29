import {
  atomReactFragmentDto,
  elementDto,
  userDto,
} from '@codelab/frontend/testing/data'
import { v4 } from 'uuid'
import { createTestRootStore } from '../../../tests/root-store'

describe('CreateElementService', () => {
  const { atomService, elementService } = createTestRootStore(userDto)
  const { createElementService } = elementService

  it('can create element as first child', async () => {
    const rootElementDto = elementDto

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
      },
      renderType: {
        __typename: 'Atom',
        id: atomReactFragmentDto.id,
      },
    } as const

    elementService.add(rootElementDto)

    await createElementService.createElementAsFirstChild(firstChildDto)
  })
})