import { createTestRootStore } from '@codelab/frontend/testing/store'
import { Element } from '../store'
import {
  atomReactFragmentDto,
  elementDto,
} from '@codelab/frontend/testing/data'
import { getSnapshot, isRefOfType } from 'mobx-keystone'
import { atomRef } from '@codelab/frontend/abstract/core'

describe('Element domain', () => {
  const { elementService, atomService } = createTestRootStore()

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
