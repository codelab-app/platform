import type {
  IElementService,
  SelectElementOption,
} from '@codelab/frontend/abstract/application'
import {
  getBuilderService,
  getRendererService,
  SelectElementOptions,
} from '@codelab/frontend/abstract/application'
import {
  type IElementModel,
  type IMoveElementContext,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend-application-prop/services'
import { getTypeService } from '@codelab/frontend-application-type/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import type { IElementDto } from '@codelab/shared/abstract/core'
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
  prop,
  transaction,
} from 'mobx-keystone'
import { CloneElementService } from './clone-element.service'
import { ElementApplicationValidationService } from './element.application.validation.service'
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
@model('@codelab/ElementApplicationService')
export class ElementService
  extends Model({
    cloneElementService: prop(() => new CloneElementService({})),
    createForm: prop(() => new CreateElementFormService({})),
    deleteModal: prop(() => new ElementModalService({})),
    elementDomainService: prop(() => new ElementDomainService({})),
    elementRepository: prop(() => new ElementRepository({})),
    id: idProp,
    updateForm: prop(() => new UpdateElementFormService({})),
    updateModal: prop(() => new UpdateElementModalService({})),
    validationService: prop(() => new ElementApplicationValidationService({})),
  })
  implements IElementService
{
  /**
   * Currently we expose the siblings field in the form for users to choose, but we should think about hiding it.
   *
   * We should make dragging the element the only way to assign sibling. This may simplify the create logic, as we don't need to insert nodes
   */
  @modelFlow
  createElement = _async(function* (this: ElementService, data: IElementDto) {
    /**
     * Need to fetch the full api, since we don't during atom selection dropdown. The api will be used in subsequent steps such as the `ElementTreeItemElementTitle` for field validation
     */
    if (data.renderType.__typename === 'Atom') {
      yield* _await(this.atomService.loadApi(data.renderType.id))
    }

    const element = this.elementDomainService.addTreeNode(data)

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
   * Load the types for this element. An element could be `atom` or `component` type, and we want to load the corresponding types.
   */
  @modelFlow
  loadDependantTypes = _async(function* (
    this: ElementService,
    element: IElementModel,
  ) {
    const apiId = element.renderType.current.api.id

    yield* _await(this.typeService.getInterface(apiId))
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
   * Call this to update modified elements
   */
  @modelFlow
  syncModifiedElements = _async(function* (this: ElementService) {
    yield* _await(
      this.updateElements(this.elementDomainService.modifiedElements),
    )

    this.elementDomainService.resetModifiedElements()
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ElementService,
    newElement: IUpdateElementData,
  ) {
    const currentElement = this.elementDomainService.element(newElement.id)
    const newRenderTypeId = newElement.renderType.id
    const oldRenderTypeId = currentElement.renderType.id

    if (newRenderTypeId !== oldRenderTypeId) {
      this.propService.reset(currentElement.props)

      // Fetch full api for the new atom so that the types
      // of the fields and sub types are available.
      yield* _await(this.atomService.loadApi(newRenderTypeId))
    }

    currentElement.writeCache(newElement)

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
  getSelectElementOptions({
    allElementOptions,
    elementTree,
    kind,
    targetElementId,
  }: SelectElementOptions) {
    const targetElement = allElementOptions?.find(
      (element) => element.value === targetElementId,
    )

    const allActiveTreeElements =
      this.rendererService.activeElementTree?.elements ?? []

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

  // @modelAction
  // loadComponentTree(component: ComponentDevelopmentFragment) {
  //   const hydratedElements = component.elements.map((element) =>
  //     this.elementDomainService.hydrate({
  //       ...element,
  //       closestContainerNode: {
  //         id: component.id,
  //       },
  //     }),
  //   )

  //   const rootElement = this.elementDomainService.element(
  //     component.rootElement.id,
  //   )

  //   return { hydratedElements, rootElement }
  // }

  element(id: string) {
    return this.elementDomainService.element(id)
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

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get rendererService() {
    return getRendererService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
