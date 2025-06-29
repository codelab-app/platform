'use client'

import type { IElementDto } from '@codelab/shared-abstract-core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  ElementService,
  type IBuilderRoute,
  type IElementService,
  IRouteType,
  isRuntimeElementRef,
  RoutePaths,
} from '@codelab/frontend-abstract-application'
import {
  type IElementModel,
  type IMoveElementContext,
  type IUpdateElementData,
} from '@codelab/frontend-abstract-domain'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import { uniqueBy } from 'remeda'
import { v4 as uuidv4 } from 'uuid'

/**
 * Object declaration would create a new object on each usage of hook, causing any usage of service to be re-rendered
 */
const createPopover = {
  close: (router: AppRouterInstance, { params, type }: IBuilderRoute) => {
    const url =
      type === IRouteType.Page
        ? RoutePaths.Page.builder(params)
        : RoutePaths.Component.builder(params)

    router.push(url)
  },
  open: (router: AppRouterInstance, { params, type }: IBuilderRoute) => {
    const url =
      type === IRouteType.Page
        ? RoutePaths.Page.builder(params)
        : RoutePaths.Component.builder(params)

    router.push(`${url}/create-element`)
  },
}

const deletePopover = {
  close: (router: AppRouterInstance, { params, type }: IBuilderRoute) => {
    const url =
      type === IRouteType.Page
        ? RoutePaths.Page.builder(params)
        : RoutePaths.Component.builder(params)

    router.push(url)
  },
  open: (
    router: AppRouterInstance,
    { params, type }: IBuilderRoute<{ elementId: string }>,
  ) => {
    const url =
      type === IRouteType.Page
        ? RoutePaths.Page.builder(params)
        : RoutePaths.Component.builder(params)

    router.push(`${url}/delete/element/${params.elementId}`)
  },
}

export const useElementService = (): IElementService => {
  const atomService = useAtomService()
  const typeService = useTypeService()
  const propService = usePropService()
  const { builderService } = useApplicationStore()
  const { componentDomainService, elementDomainService } = useDomainStore()
  const selectedNode = builderService.selectedNode

  const loadElementRenderTypeApi = async (element: IUpdateElementData) => {
    if (element.renderType.__typename === 'Atom') {
      await atomService.loadApi(element.renderType.id)
    } else {
      const component = componentDomainService.component(element.renderType.id)

      await typeService.getInterface(component.api.id)
    }
  }

  /**
   * When we create a new element, the selected node should stay at the parent
   */
  const create = async (data: IElementDto) => {
    await loadElementRenderTypeApi(data)

    const element = elementDomainService.addTreeNode(data)

    /**
     * We want to keep the selected node expanded, so we can see the children
     */
    if (selectedNode && isRuntimeElementRef(selectedNode)) {
      // references fails to resolve when called by convertElementToComponent
      selectedNode.maybeCurrent?.setExpanded(true)
    }

    await elementRepository.add(data, {
      revalidateTags: [CACHE_TAGS.Element.list()],
      tracing: {
        operationId: ElementService.CreateElement,
        requestId: uuidv4(),
      },
    })
    await syncModifiedElements()

    return element
  }

  const deleteElement = async (subRootElement: IElementModel) => {
    console.debug('ElementService.delete', subRootElement)

    const elementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    builderService.selectPreviousElementOnDelete()

    subRootElement.detachFromTree()

    await elementRepository.delete(elementsToDelete, {
      revalidateTags: [CACHE_TAGS.Element.list()],
      tracing: {
        operationId: ElementService.DeleteElement,
        requestId: uuidv4(),
      },
    })

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
      await propService.reset(currentElement.props.toJson)
      await loadElementRenderTypeApi(newElement)
    }

    currentElement.writeCache(newElement)

    await elementRepository.update({ id: currentElement.id }, newElement, {
      tracing: {
        operationId: ElementService.UpdateElement,
        requestId: uuidv4(),
      },
    })

    return currentElement
  }

  const updateElements = async (elements: Array<IElementModel>) => {
    await Promise.all(
      uniqueBy(elements, (element) => element.id).map((element) =>
        elementRepository.update({ id: element.id }, element.toJson, {
          revalidateTags: [CACHE_TAGS.Element.list()],
          tracing: {
            operationId: ElementService.UpdateElementsBatch,
            requestId: uuidv4(),
          },
        }),
      ),
    )
  }

  const removeMany = async (subRootElements: Array<IElementModel>) => {
    const deletedElements = await Promise.all(
      subRootElements.map((subRootElement) => remove(subRootElement)),
    )

    return deletedElements.reduce((count, current) => current + count)
  }

  const remove = async (subRootElement: IElementModel) => {
    const elementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    builderService.selectPreviousElementOnDelete()

    subRootElement.detachFromTree()

    /**
     * delete props
     */
    const deletedElementsCount = await elementRepository.delete(
      elementsToDelete,
      {
        tracing: {
          operationId: ElementService.RemoveElements,
          requestId: uuidv4(),
        },
      },
    )

    elementsToDelete.reverse().forEach((element) => {
      // this.removeClones(element.id)
      elementDomainService.elements.delete(element.id)
    })

    await syncModifiedElements()

    return deletedElementsCount
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
    remove,
    removeMany,
    syncModifiedElements,
    update,
  }
}
