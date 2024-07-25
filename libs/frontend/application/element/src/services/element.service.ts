import type {
  IElementService,
  SelectElementOption,
  SelectElementOptions,
} from '@codelab/frontend/abstract/application'
import {
  type IElementModel,
  type IMoveElementContext,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { IElementTypeKind } from '@codelab/shared/abstract/core'
import difference from 'lodash/difference'
import uniqBy from 'lodash/uniqBy'
import { CloneElementService } from './clone-element.service'
import { ElementApplicationValidationService } from './element.application.validation.service'
import {
  CreateElementFormService,
  UpdateElementFormService,
} from './element-form.service'
import {
  ElementModalService,
  UpdateElementModalService,
} from './element-modal.service'

export const useElementService = (): IElementService => {
  const atomService = useAtomService()
  const typeService = useTypeService()
  const propService = usePropService()
  const { elementDomainService } = useDomainStore()
  const cloneElementService = new CloneElementService({})
  const validationService = new ElementApplicationValidationService({})
  const createForm = new CreateElementFormService({})
  const updateForm = new UpdateElementFormService({})
  const deleteModal = new ElementModalService({})
  const updateModal = new UpdateElementModalService({})

  const createElement = async (data: IElementDto) => {
    if (data.renderType.__typename === 'Atom') {
      await atomService.loadApi(data.renderType.id)
    }

    const element = elementDomainService.addTreeNode(data)

    await elementRepository.add(element)
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
      propService.reset(currentElement.props)

      await atomService.loadApi(newRenderTypeId)
    }

    currentElement.writeCache(newElement)

    await elementRepository.update(currentElement)

    return currentElement
  }

  const updateElements = async (elements: Array<IElementModel>) => {
    await Promise.all(
      uniqBy(elements, (element) => element.id).map((element) =>
        elementRepository.updateNodes(element),
      ),
    )
  }

  const getSelectElementOptions = ({
    allElementOptions,
    elementTree,
    kind,
    targetElementId,
  }: SelectElementOptions) => {
    const targetElement = allElementOptions?.find(
      (element) => element.value === targetElementId,
    )

    const allActiveTreeElements =
      rendererService.activeElementTree?.elements ?? []

    const allActiveTreeElementOptions =
      allActiveTreeElements.map(mapElementOption)

    const elementMap = (allElementOptions ?? []).reduce((acc, element) => {
      acc[element.value] = element

      return acc
    }, {} as Record<string, SelectElementOption>)

    let selectOptions: Array<SelectElementOption> = []

    if (!targetElement) {
      selectOptions = allElementOptions ?? allActiveTreeElementOptions
    } else {
      switch (kind) {
        case IElementTypeKind.AllElements: {
          selectOptions = allElementOptions ?? allActiveTreeElementOptions
          break
        }

        case IElementTypeKind.ChildrenOnly: {
          selectOptions = getElementChildren(targetElement, elementMap)
          break
        }

        case IElementTypeKind.DescendantsOnly: {
          selectOptions = getDescendants(targetElement, elementMap)
          break
        }

        case IElementTypeKind.ExcludeDescendantsElements: {
          selectOptions = difference(
            allElementOptions,
            getDescendants(targetElement, elementMap),
          ).filter(({ value }) => value !== targetElement.value)
          break
        }

        default:
          selectOptions = []
      }
    }

    return selectOptions
  }

  const getElement = (id: string) => {
    return elementDomainService.element(id)
  }

  const getDescendants = (
    element: SelectElementOption,
    elementMap: Record<string, SelectElementOption>,
  ) => {
    const descendants: Array<SelectElementOption> = []

    const _getDescendants = (el: SelectElementOption) => {
      for (const child of getElementChildren(el, elementMap)) {
        descendants.push(child)
        _getDescendants(child)
      }
    }

    _getDescendants(element)

    return descendants
  }

  const getElementChildren = (
    element: SelectElementOption,
    elementMap: Record<string, SelectElementOption>,
  ) => {
    return (
      element.childrenIds
        ?.map((childId) => elementMap[childId])
        .filter(
          (selectElementOption): selectElementOption is SelectElementOption =>
            Boolean(selectElementOption),
        ) ?? []
    )
  }

  return {
    cloneElementService,
    createElement,
    deleteElement,
    deleteModal,
    getElement,
    getSelectElementOptions,
    loadDependantTypes,
    move,
    syncModifiedElements,
    update,
    updateModal,
    validationService,
  }
}
