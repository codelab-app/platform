import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { atomRef } from '@codelab/frontend/abstract/domain'
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

const rootElementDto = { ...elementDto, name: 'Root Element' }

describe('Element domain', () => {
  const { atomService, elementService, pageService } =
    createTestRootStore(userDto)

  const { elementDomainService } = elementService

  rootElementDto.renderType.id = atomReactFragmentDto.id

  pageService.add(pageDto)
  elementDomainService.add({ ...rootElementDto, page: pageDto })
  atomService.add(atomReactFragmentDto)

  const rootElement = elementDomainService.elements.get(rootElementDto.id)

  it('should add a render type to element', () => {
    const renderType = rootElement?.renderType

    expect(renderType?.id).toBe(atomReactFragmentDto.id)
    expect(renderType).toBeDefined()
    expect(isRefOfType(renderType!, atomRef)).toBeTruthy()
  })

  const firstChildDto = {
    ...rootElementDto,
    id: v4(),
    name: 'First Child',
    parentElement: rootElement,
  }

  let firstChild: IElementModel

  describe('First child', () => {
    // (firstChild)
    it('should add element as first child', () => {
      elementDomainService.resetModifiedElements()

      firstChild = elementDomainService.add(firstChildDto)

      expect(rootElement?.firstChild?.id).toBe(firstChild.id)
      expect(firstChild.parentElement?.id).toBe(rootElement?.id)

      expect(elementDomainService.modifiedElements).toHaveLength(2)
    })
  })

  const nextSiblingDto = {
    ...rootElementDto,
    id: v4(),
    name: 'Next Sibling',
    prevSibling: firstChildDto,
  }

  const anotherNextSiblingDto: IElementDTO = {
    ...rootElementDto,
    id: v4(),
    name: 'Another Next Sibling',
    prevSibling: firstChildDto,
  }

  describe('Next sibling', () => {
    // (firstChild)-[nextSibling]
    it('should add element as next sibling', () => {
      elementDomainService.resetModifiedElements()

      const nextSibling = elementDomainService.add(nextSiblingDto)

      expect(firstChild.nextSibling?.id).toBe(nextSibling.id)
      expect(nextSibling.prevSibling?.id).toBe(firstChild.id)

      expect(elementDomainService.modifiedElements).toHaveLength(2)
    })

    // (firstChild)-[anotherNextSibling]-(nextSibling)
    it('should insert next sibling between 2 nodes', () => {
      elementDomainService.resetModifiedElements()

      const anotherNextSibling = elementDomainService.add(anotherNextSiblingDto)
      const nextSiblingModel = elementService.element(nextSiblingDto.id)

      expect(firstChild.nextSibling?.id).toBe(anotherNextSibling.id)

      expect(anotherNextSibling.prevSibling?.id).toBe(firstChild.id)
      expect(anotherNextSibling.nextSibling?.id).toBe(nextSiblingDto.id)

      expect(nextSiblingModel.prevSibling?.id).toBe(anotherNextSibling.id)

      expect(elementDomainService.modifiedElements).toHaveLength(3)
    })
  })

  const prevSiblingDto = {
    ...rootElementDto,
    id: v4(),
    name: 'Prev Sibling',
    // nextSibling is last at this point
    nextSibling: nextSiblingDto,
  }

  describe('Prev sibling', () => {
    // (firstChild)-(anotherNextSibling)-[prevSibling]-(nextSibling)
    it('should add element as prev sibling', () => {
      elementDomainService.resetModifiedElements()

      const prevSibling = elementDomainService.add(prevSiblingDto)

      const anotherNextSiblingModel = elementService.element(
        anotherNextSiblingDto.id,
      )

      const nextSiblingModel = elementService.element(nextSiblingDto.id)

      // console.debug(
      //   elementService.element(anotherNextSiblingDto.id).toElementTree,
      //   elementService.element(prevSibling.id).toElementTree,
      //   elementService.element(nextSiblingDto.id).toElementTree,
      // )

      expect(anotherNextSiblingModel.nextSibling?.id).toBe(prevSibling.id)

      expect(prevSibling.prevSibling?.id).toBe(anotherNextSiblingDto.id)
      expect(prevSibling.nextSibling?.id).toBe(nextSiblingDto.id)

      expect(nextSiblingModel.prevSibling?.id).toBe(prevSibling.id)

      expect(elementDomainService.modifiedElements).toHaveLength(3)
    })
  })

  describe('Remove', () => {
    // (firstChild)-[anotherNextSibling]-(prevSibling)-(nextSibling)
    // to
    // (firstChild)-(prevSibling)-(nextSibling)
    it('can detach from tree', () => {
      const anotherNextSibling = elementService.element(
        anotherNextSiblingDto.id,
      )

      anotherNextSibling.detachFromTree()

      const prevSibling = elementService.element(prevSiblingDto.id)

      expect(anotherNextSibling.parentElement).toBeNull()
      expect(anotherNextSibling.prevSibling).toBeNull()
      expect(anotherNextSibling.nextSibling).toBeNull()

      expect(firstChild.nextSibling?.id).toBe(prevSibling.id)
      expect(prevSibling.prevSibling?.id).toBe(firstChild.id)
    })

    // (rootElement)
    //  /
    // [firstChild]-(prevSibling)-(nextSibling)
    //
    // (rootElement)
    //  /
    // (prevSibling)-(nextSibling)
    it('can detach first child', () => {
      firstChild.detachFromTree()

      const prevSibling = elementService.element(prevSiblingDto.id)

      expect(rootElement?.firstChild?.id).toBe(prevSibling.id)
      expect(prevSibling.parentElement?.id).toBe(rootElement?.id)
    })
  })
})
