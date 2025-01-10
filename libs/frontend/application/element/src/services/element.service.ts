import type { IElementService } from '@codelab/frontend/abstract/application'
import type {
  ComponentContextParams,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  type IElementModel,
  type IMoveElementContext,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { uniqueBy } from 'remeda'

/**
 * Object declaration would create a new object on each usage of hook, causing any usage of service to be re-rendered
 */
const createPopover = {
  close: (router: AppRouterInstance) => {
    router.back()
  },
  open: (
    router: AppRouterInstance,
    { appId, componentId, pageId }: PageContextParams & ComponentContextParams,
  ) => {
    const url =
      appId && pageId
        ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
        : PageType.ComponentBuilder({ componentId })

    router.push(`${url}/create-element`)
  },
}

const deletePopover = {
  close: (router: AppRouterInstance) => {
    router.back()
  },
  open: (
    router: AppRouterInstance,
    {
      appId,
      componentId,
      elementId,
      pageId,
    }: PageContextParams & ComponentContextParams & { elementId: string },
  ) => {
    const url =
      appId && pageId
        ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
        : PageType.ComponentBuilder({ componentId })

    router.push(`${url}/delete/element/${elementId}`)
  },
}

export const useElementService = (): IElementService => {
  const atomService = useAtomService()
  const typeService = useTypeService()
  const propService = usePropService()
  const { componentDomainService, elementDomainService } = useDomainStore()

  const create = async (data: IElementDto) => {
    if (data.renderType.__typename === 'Atom') {
      await atomService.loadApi(data.renderType.id)
    } else {
      const component = componentDomainService.component(data.renderType.id)

      await typeService.getInterface(component.api.id)
    }

    const element = elementDomainService.addTreeNode(data)

    // when new element is inserted into elements tree -
    // auto-expand parent node, so that new one becomes visible
    if (element.closestParentElement?.maybeCurrent?.expanded === false) {
      element.closestParentElement.current.setExpanded(true)
    }

    await elementRepository.add(data)
    await syncModifiedElements()

    return element
  }

  const deleteElement = async (subRootElement: IElementModel) => {
    console.debug('ElementService.delete', subRootElement)

    const elementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    // builderService.selectPreviousElementOnDelete()

    subRootElement.detachFromTree()

    await elementRepository.delete(elementsToDelete)

    elementsToDelete.reverse().forEach((element) => {
      elementDomainService.elements.delete(element.id)
    })

    await syncModifiedElements()
  }

  const loadDependantTypes = async (element: IElementModel) => {
    const apiId = element.renderType.current.api.id

    await typeService.getInterface(apiId)
  }

  const move = async (context: IMoveElementContext) => {
    elementDomainService.move(context)

    await updateElements(elementDomainService.modifiedElements)
  }

  const syncModifiedElements = async () => {
    await updateElements(elementDomainService.modifiedElements)

    elementDomainService.resetModifiedElements()
  }

  const update = async (newElement: IUpdateElementData) => {
    const currentElement = elementDomainService.element(newElement.id)
    const newRenderTypeId = newElement.renderType.id
    const oldRenderTypeId = currentElement.renderType.id

    if (newRenderTypeId !== oldRenderTypeId) {
      propService.reset(currentElement.props.toJson)

      await atomService.loadApi(newRenderTypeId)
    }

    currentElement.writeCache(newElement)

    await elementRepository.update({ id: currentElement.id }, newElement)

    return currentElement
  }

  const updateElements = async (elements: Array<IElementModel>) => {
    await Promise.all(
      uniqueBy(elements, (element) => element.id).map((element) =>
        elementRepository.update({ id: element.id }, element.toJson),
      ),
    )
  }

  /**
   * If we don't memoize the return object, it will be recreated on each render, causing the calling component to re-render
   */
  return {
    create,
    createPopover,
    deletePopover,
    loadDependantTypes,
    move,
    remove: deleteElement,
    syncModifiedElements,
    update,
  }
}
