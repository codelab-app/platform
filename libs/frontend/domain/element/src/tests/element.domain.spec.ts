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
  elementDomainService.hydrate({ ...rootElementDto, page: pageDto })
  atomService.add(atomReactFragmentDto)

  const rootElement = elementService.element(rootElementDto.id)

  it('should add a render type to element', () => {
    const renderType = rootElement.renderType

    expect(renderType.id).toBe(atomReactFragmentDto.id)
    expect(renderType).toBeDefined()
    expect(isRefOfType(renderType!, atomRef)).toBeTruthy()
  })

  const firstChildDto = {
    ...rootElementDto,
    id: v4(),
    name: 'First Child',
    parentElement: rootElement,
  }

  const anotherFirstChildDto = {
    ...rootElementDto,
    id: v4(),
    name: 'Another First Child',
    parentElement: rootElement,
  }

  let firstChild: IElementModel
  let anotherFirstChild: IElementModel

  describe('First child', () => {
    // (rootElement)
    //  /
    // (firstChild)
    it('should add element as first child', () => {
      elementDomainService.resetModifiedElements()

      firstChild = elementDomainService.addTreeNode(firstChildDto)

      expect(rootElement.firstChild?.id).toBe(firstChild.id)
      expect(firstChild.parentElement?.id).toBe(rootElement.id)

      expect(elementDomainService.modifiedElements).toHaveLength(2)
    })

    // (rootElement)
    //  /
    // [anotherFirstChild]-(firstChild)
    it('should replace as first child', () => {
      anotherFirstChild = elementDomainService.addTreeNode(anotherFirstChildDto)

      expect(rootElement.firstChild?.id).toBe(anotherFirstChild.id)
      expect(anotherFirstChild.parentElement?.id).toBe(rootElement.id)

      expect(anotherFirstChild.nextSibling?.id).toBe(firstChildDto.id)
      expect(firstChild.prevSibling?.id).toBe(anotherFirstChild.id)
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

  let nextSibling: IElementModel
  let anotherNextSibling: IElementModel

  describe('Next sibling', () => {
    // (rootElement)
    //  /
    // (anotherFirstChild)-(firstChild)-[nextSibling]
    it('should add element as next sibling', () => {
      elementDomainService.resetModifiedElements()

      nextSibling = elementDomainService.addTreeNode(nextSiblingDto)

      expect(anotherFirstChild.nextSibling?.id).toBe(firstChildDto.id)
      expect(nextSibling.prevSibling?.id).toBe(firstChildDto.id)

      expect(elementDomainService.modifiedElements).toHaveLength(2)
    })

    // (rootElement)
    //  /
    // (anotherFirstChild)-(firstChild)-[anotherNextSibling]-(nextSibling)
    it('should insert next sibling between 2 nodes', () => {
      elementDomainService.resetModifiedElements()

      anotherNextSibling = elementDomainService.addTreeNode(
        anotherNextSiblingDto,
      )

      expect(firstChild.nextSibling?.id).toBe(anotherNextSibling.id)

      expect(anotherNextSibling.prevSibling?.id).toBe(firstChild.id)
      expect(anotherNextSibling.nextSibling?.id).toBe(nextSiblingDto.id)

      expect(nextSibling.prevSibling?.id).toBe(anotherNextSibling.id)

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

  let prevSibling: IElementModel

  describe('Prev sibling', () => {
    // (rootElement)
    //  /
    // (anotherFirstChild)-(firstChild)-(anotherNextSibling)-[prevSibling]-(nextSibling)
    it('should add element as prev sibling', () => {
      elementDomainService.resetModifiedElements()

      prevSibling = elementDomainService.addTreeNode(prevSiblingDto)

      expect(anotherNextSibling.nextSibling?.id).toBe(prevSibling.id)

      expect(prevSibling.prevSibling?.id).toBe(anotherNextSiblingDto.id)
      expect(prevSibling.nextSibling?.id).toBe(nextSiblingDto.id)

      expect(nextSibling.prevSibling?.id).toBe(prevSibling.id)

      expect(elementDomainService.modifiedElements).toHaveLength(3)
    })
  })

  // (rootElement)
  //  /
  // (anotherFirstChild)-(firstChild)-(anotherNextSibling)-[prevSibling]-(nextSibling)
  // /
  // (secondLevelFirstChild)
  describe('Element getters', () => {
    let secondLevelFirstChild: IElementModel

    it('should have closestParentElement', () => {
      const secondLevelFirstChildDto = {
        ...rootElementDto,
        id: v4(),
        name: 'Second Level First Child',
        parentElement: nextSibling,
      }

      secondLevelFirstChild = elementDomainService.addTreeNode(
        secondLevelFirstChildDto,
      )

      expect(nextSibling.closestParentElement?.current).toBe(rootElement)
      expect(anotherNextSibling.closestParentElement?.current).toBe(rootElement)
      expect(firstChild.closestParentElement?.current).toBe(rootElement)
      expect(anotherFirstChild.closestParentElement?.current).toBe(rootElement)

      expect(rootElement.closestParentElement?.current).toBeUndefined()

      expect(secondLevelFirstChild.closestParentElement?.current).toBe(
        nextSibling,
      )
    })

    it('should have children', () => {
      const children = rootElement.children.map((element) => element.toJson)

      expect(children).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: nextSibling.id,
          }),
          expect.objectContaining({
            id: anotherNextSibling.id,
          }),
          expect.objectContaining({
            id: firstChild.id,
          }),
          expect.objectContaining({
            id: anotherFirstChild.id,
          }),
        ]),
      )
    })

    it('should have closestSubTreeRootElement', () => {
      expect(nextSibling.closestSubTreeRootElement).toBe(rootElement)
      expect(anotherNextSibling.closestSubTreeRootElement).toBe(rootElement)
      expect(firstChild.closestSubTreeRootElement).toBe(rootElement)
      expect(anotherFirstChild.closestSubTreeRootElement).toBe(rootElement)

      expect(rootElement.closestSubTreeRootElement).toBe(rootElement)

      expect(secondLevelFirstChild.closestSubTreeRootElement).toBe(rootElement)
    })
  })

  describe('Remove', () => {
    // (rootElement)
    // /
    // (anotherFirstChild)-(firstChild)-[anotherNextSibling]-(prevSibling)-(nextSibling)
    it('can detach from tree', () => {
      anotherNextSibling.detachFromTree()

      // expect(anotherNextSibling.parentElement).toBeNull()
      // expect(anotherNextSibling.prevSibling).toBeNull()
      // expect(anotherNextSibling.nextSibling).toBeNull()

      expect(firstChild.nextSibling?.id).toBe(prevSibling.id)
      expect(prevSibling.prevSibling?.id).toBe(firstChild.id)
    })

    // (rootElement)
    //  /
    // [anotherFirstChild]-(firstChild)-(prevSibling)-(nextSibling)
    it('can detach first child', () => {
      anotherFirstChild.detachFromTree()

      expect(rootElement.firstChild?.id).toBe(firstChildDto.id)
      expect(firstChild.parentElement?.id).toBe(rootElement.id)
    })
  })
})
