import type {
  IElementService,
  SelectElementOption,
} from '@codelab/frontend/abstract/application'
import {
  getBuilderService,
  getComponentService,
  SelectElementOptions,
} from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IMoveElementContext,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/application/prop'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import { ComponentDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementTypeKind } from '@codelab/shared/abstract/core'
import difference from 'lodash/difference'
import uniqBy from 'lodash/uniqBy'
import { computed } from 'mobx'
import {
  _async,
  _await,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { CloneElementService } from './clone-element.service'
import { ElementRepository } from './element.repo'
import {
  CreateElementFormService,
  UpdateElementFormService,
} from './element-form.service'
import {
  ElementModalService,
  UpdateElementModalService,
} from './element-modal.service'

/**
 * We will have a single ElementService that contains all elements from
 *
 * - PageElementTree
 * - ComponentElementTree
 */
@model('@codelab/ElementService')
export class ElementService
  extends Model({
    clonedElements: prop(() => objectMap<IElementModel>()),
    cloneElementService: prop(() => new CloneElementService({})),
    createForm: prop(() => new CreateElementFormService({})),
    // createModal: prop(() => new CreateElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),
    elementDomainService: prop(() => new ElementDomainService({})),
    elementRepository: prop(() => new ElementRepository({})),
    id: idProp,
    updateForm: prop(() => new UpdateElementFormService({})),
    updateModal: prop(() => new UpdateElementModalService({})),
  })
  implements IElementService
{
  @modelFlow
  createElement = _async(function* (this: ElementService, data: IElementDTO) {
    const element = this.elementDomainService.addTreeNode(data)

    yield* _await(this.elementRepository.add(element))

    yield* _await(this.elementRepository.add(element))
    yield* _await(this.syncModifiedElements())

    /**
     * Syncs all components to the current element tree
     */
    // const parentElementClone = [
    //   ...this.elementService.clonedElements.values(),
    // ].find(({ sourceElement }) => sourceElement?.id === data.parentElement?.id)

    // if (parentElementClone) {
    //   const elementClone = element.clone()

    //   this.moveElementService.attachElementAsFirstChild({
    //     element: elementClone,
    //     parentElement: parentElementClone,
    //   })
    // }

    // yield* _await(this.elementService.updateAffectedElements(affectedNodeIds))

    return element
  })

  /**
   * Call this to update modified elements
   */
  @modelFlow
  syncModifiedElements = _async(function* (this: ElementService) {
    yield* _await(
      this.updateElements(this.elementDomainService.modifiedElements),
    )

    this.elementDomainService.resetModifiedElements()
  })

  /**
   * We compare the prev and new state of the changes in the parent/sibling properties to see what operation we will perform
   */
  @modelFlow
  move = _async(function* (this: ElementService, context: IMoveElementContext) {
    this.elementDomainService.move(context)

    yield* _await(
      this.updateElements(this.elementDomainService.modifiedElements),
    )
  })

  /**
   * Need to take care of reconnecting parent/sibling nodes
   */
  @modelFlow
  @transaction
  delete = _async(function* (
    this: ElementService,
    subRootElement: IElementModel,
  ) {
    console.debug('ElementService.delete', subRootElement)

    const parentComponent = subRootElement.parentComponent?.current
    const childrenContainer = parentComponent?.childrenContainerElement.current

    // Check if the element is linked as a children container in parent component
    // and replace this link to component root before element is deleted
    // if (parentComponent && childrenContainer?.id === subRootElement.id) {
    //   yield* _await(
    //     this.componentService.update({
    //       childrenContainerElement: {
    //         id: parentComponent.rootElement.current.id,
    //       },
    //       id: parentComponent.id,
    //       name: parentComponent.name,
    //     }),
    //   )
    // }

    // Get elements before detaching
    const elementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    subRootElement.detachFromTree()

    /**
     * Set the new node before we delete
     */
    const selectedNode =
      subRootElement.prevSibling?.current ??
      subRootElement.closestParentElement?.current ??
      subRootElement.closestSubTreeRootElement

    this.builderService.setSelectedNode(elementRef(selectedNode))

    yield* _await(this.elementRepository.delete(elementsToDelete))

    elementsToDelete.reverse().forEach((element) => {
      // this.removeClones(element.id)
      this.elementDomainService.elements.delete(element.id)
    })

    yield* _await(this.syncModifiedElements())

    return
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ElementService,
    newElement: IUpdateElementData,
  ) {
    const currentElement = this.element(newElement.id)
    const newRenderTypeId = newElement.renderType.id
    const oldRenderTypeId = currentElement.renderType.id

    if (newRenderTypeId !== oldRenderTypeId) {
      this.propService.reset(currentElement.props)
    }

    currentElement.writeCache(newElement)
    this.writeCloneCache(newElement)

    yield* _await(this.elementRepository.update(currentElement))

    return currentElement
  })

  /**
   * This only updates the connections for the elementTree, not the actual data on the element
   */
  @modelFlow
  @transaction
  updateElements = _async(function* (
    this: ElementService,
    elements: Array<IElementModel>,
  ) {
    yield* _await(
      Promise.all(
        uniqBy(elements, (element) => element.id).map((element) =>
          this.elementRepository.updateNodes(element),
        ),
      ),
    )
  })

  @modelAction
  element(id: string) {
    const element = this.maybeElement(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  @modelAction
  getSelectElementOptions({
    allElementOptions = [],
    elementTree,
    kind,
    targetElementId,
  }: SelectElementOptions) {
    const targetElement = allElementOptions.find(
      (element) => element.value === targetElementId,
    )

    const elementMap = allElementOptions.reduce((acc, element) => {
      acc[element.value] = element

      return acc
    }, {} as Record<string, SelectElementOption>)

    let selectOptions: Array<SelectElementOption>

    if (!targetElement) {
      selectOptions = allElementOptions
    } else {
      switch (kind) {
        case IElementTypeKind.AllElements: {
          selectOptions = allElementOptions
          break
        }

        case IElementTypeKind.ChildrenOnly: {
          selectOptions = this.getElementChildren(targetElement, elementMap)
          break
        }

        case IElementTypeKind.DescendantsOnly: {
          selectOptions = this.getDescendants(targetElement, elementMap)
          break
        }

        case IElementTypeKind.ExcludeDescendantsElements: {
          selectOptions = difference(
            allElementOptions,
            this.getDescendants(targetElement, elementMap),
          )
            // remove the element itself
            .filter(({ value }) => value !== targetElement.value)
          break
        }

        default:
          selectOptions = []
      }
    }

    return selectOptions
  }

  @modelAction
  loadComponentTree(component: ComponentDevelopmentFragment) {
    const elements = [
      component.rootElement,
      ...component.rootElement.descendantElements,
    ]

    const hydratedElements = elements.map((element) =>
      this.elementDomainService.hydrate({
        ...element,
        closestContainerNode: {
          id: component.id,
        },
      }),
    )

    const rootElement = this.element(component.rootElement.id)

    return { hydratedElements, rootElement }
  }

  @modelAction
  maybeElement(id: string) {
    return (
      this.elementDomainService.elements.get(id) || this.clonedElements.get(id)
    )
  }

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => {
        // this.moveElementService.detachElementFromElementTree(id)
        this.clonedElements.delete(id)
      })
  }

  private getDescendants(
    element: SelectElementOption,
    elementMap: Record<string, SelectElementOption>,
  ) {
    const descendants: Array<SelectElementOption> = []

    const _getDescendants = (el: SelectElementOption) => {
      for (const child of this.getElementChildren(el, elementMap)) {
        descendants.push(child)
        _getDescendants(child)
      }
    }

    _getDescendants(element)

    return descendants
  }

  private getElementChildren(
    element: SelectElementOption,
    elementMap: Record<string, SelectElementOption>,
  ) {
    return (
      element.childrenIds
        ?.map((childId) => elementMap[childId])
        .filter(
          (selectElementOption): selectElementOption is SelectElementOption =>
            Boolean(selectElementOption),
        ) ?? []
    )
  }

  @modelAction
  private writeCloneCache({ id, ...elementData }: IUpdateElementData) {
    return [...this.clonedElements.values()]
      .filter((clonedElement) => clonedElement.sourceElement?.id === id)
      .map((clonedElement) => clonedElement.writeCache({ ...elementData }))
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }
}
