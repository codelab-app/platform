import type {
  IElementModel,
  IElementService,
  IMoveElementContext,
} from '@codelab/frontend/abstract/domain'
import {
  getComponentService,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import { ComponentDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
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
import { ElementDomainService } from './element.domain.service'
import { ElementRepository } from './element.repo'
import {
  CreateElementFormService,
  UpdateElementFormService,
} from './element-form.service'
import {
  CreateElementModalService,
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
    createModal: prop(() => new CreateElementModalService({})),
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
    const element = this.elementDomainService.add(data)

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
  delete = _async(function* (this: ElementService, subRoot: IElementModel) {
    console.debug('ElementService.delete', subRoot)

    const subRootElement = this.element(subRoot.id)
    const parentComponent = subRootElement.parentComponent?.current
    const childrenContainer = parentComponent?.childrenContainerElement.current

    // Check if the element is linked as a children container in parent component
    // and replace this link to component root before element is deleted
    if (parentComponent && childrenContainer?.id === subRootElement.id) {
      yield* _await(
        this.componentService.update({
          childrenContainerElement: {
            id: parentComponent.rootElement.current.id,
          },
          id: parentComponent.id,
          name: parentComponent.name,
        }),
      )
    }

    subRootElement.detachFromTree()

    const allElementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    allElementsToDelete.reverse().forEach((element) => {
      this.removeClones(element.id)
      this.elementDomainService.elements.delete(element.id)
    })

    yield* _await(this.syncModifiedElements())
    yield* _await(this.elementRepository.delete(allElementsToDelete))

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
      this.propService.reset(currentElement.props.id)
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
  loadComponentTree(component: ComponentDevelopmentFragment) {
    const elements = [
      component.rootElement,
      ...component.rootElement.descendantElements,
    ]

    const hydratedElements = elements.map((element) =>
      this.elementDomainService.add({
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

  @modelAction
  private writeCloneCache({ id, ...elementData }: IUpdateElementData) {
    return [...this.clonedElements.values()]
      .filter((clonedElement) => clonedElement.sourceElement?.id === id)
      .map((clone) => clone.writeCache({ ...elementData }))
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
