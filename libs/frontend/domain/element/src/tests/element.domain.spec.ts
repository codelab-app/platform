import { atomRef } from '@codelab/frontend/abstract/domain'
import {
  atomReactFragmentDto,
  elementDto,
  pageDto,
  userDto,
} from '@codelab/frontend/test/data'
import { isRefOfType } from 'mobx-keystone'
import { createTestRootStore } from './root-store'

describe('Element domain', () => {
  const { atomService, elementService, pageService } =
    createTestRootStore(userDto)

  it('should add a render type to element', () => {
    elementDto.renderType.id = atomReactFragmentDto.id

    pageService.add(pageDto)
    elementService.add({ ...elementDto, page: pageDto })
    atomService.add(atomReactFragmentDto)

    const element = elementService.elements.get(elementDto.id)
    const renderType = element?.renderType

    expect(renderType?.id).toBe(atomReactFragmentDto.id)
    expect(renderType).toBeDefined()
    expect(isRefOfType(renderType!, atomRef)).toBeTruthy()
  })
})
