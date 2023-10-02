import { atomRef } from '@codelab/frontend/abstract/core'
import {
  atomReactFragmentDto,
  elementDto,
  userDto,
} from '@codelab/frontend/test/data'
import { isRefOfType } from 'mobx-keystone'
import { createTestRootStore } from './root-store'

describe('Element domain', () => {
  const { atomService, elementService } = createTestRootStore(userDto)

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
