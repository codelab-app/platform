import type {
  ICreateElementData,
  IElementModel,
  IElementRenderTypeModel,
  IElementService,
} from '@codelab/frontend/abstract/core'
import {
  atomRef,
  componentRef,
  getComponentService,
  IUpdateElementData,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { ComponentDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import uniq from 'lodash/uniq'
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
import { v4 } from 'uuid'
import { Element } from '../store/element.model'
import { CloneElementService } from '../use-cases/element/clone-element/clone-element.service'
import { CreateElementService } from '../use-cases/element/create-element/create-element.service'
import { MoveElementService } from '../use-cases/element/move-element/move-element.service'
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
    createElementService: prop(() => new CreateElementService({})),
    createForm: prop(() => new CreateElementFormService({})),
    createModal: prop(() => new CreateElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),
    elementRepository: prop(() => new ElementRepository({})),
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElementModel>()),
    id: idProp,
    moveElementService: prop(() => new MoveElementService({})),
    updateForm: prop(() => new UpdateElementFormService({})),
    updateModal: prop(() => new UpdateElementModalService({})),
  })
  implements IElementService
{
  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  create = _async(function* (this: ElementService, data: ICreateElementData) {
    // const renderType = yield* _await(this.loadRenderType(data.renderType))

    const elementProps = this.propService.add({
      data: data.props?.data,
      // data.props?.data ?? makeDefaultProps(renderType.current.api.current),
      id: v4(),
    })

    const element = this.add({
      ...data,
      props: elementProps,
    })

    yield* _await(this.elementRepository.add(element))

    return element
  })

  /**
   * Need to take care of reconnecting parent/sibling nodes
   */
  @modelFlow
  @transaction
  delete = _async(function* (this: ElementService, subRoot: IElementModel) {
    console.debug('deleteElementSubgraph', subRoot)

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

    const affectedNodeIds =
      this.moveElementService.detachElementFromElementTree(subRootElement.id)

    const allElementsToDelete = [
      subRootElement,
      ...subRootElement.descendantElements,
    ]

    this.elements.delete(subRootElement.id)
    allElementsToDelete.reverse().forEach((element) => {
      this.removeClones(element.id)
      this.elements.delete(element.id)
    })

    yield* _await(this.updateAffectedElements(affectedNodeIds))
    yield* _await(this.elementRepository.delete(allElementsToDelete))

    return
  })

  /**
   * If an element is created or updated with renderType atom or component
   * that is not used yet anywhere in the current page,
   * this will load its interface types and its fields
   */
  @modelFlow
  @transaction
  loadRenderType = _async(function* (
    this: ElementService,
    renderType: IElementDTO['renderType'],
  ) {
    let elementRenderType: IElementRenderTypeModel | undefined

    if (renderType.__typename === 'Atom') {
      const atom = throwIfUndefined(
        yield* _await(this.atomService.getOne(renderType.id)),
      )

      elementRenderType = atomRef(atom)
    }

    if (renderType.__typename === 'Component') {
      const component = throwIfUndefined(
        yield* _await(this.componentService.getOne(renderType.id)),
      )

      elementRenderType = componentRef(component)
    }

    if (!elementRenderType) {
      throw new Error('Invalid renderType')
    }

    return elementRenderType
  })

  @modelFlow
  @transaction
  update = _async(function* (this: ElementService, data: IUpdateElementData) {
    console.log(data)
    yield* _await(this.loadRenderType(data.renderType))

    const { id, ...elementData } = data
    const element = this.element(id)
    const { id: newRenderTypeId } = elementData.renderType
    const { id: oldRenderTypeId } = element.renderType

    if (newRenderTypeId !== oldRenderTypeId) {
      this.propService.reset(element.props.id)
    }

    element.writeCache({ ...elementData })
    this.writeCloneCache({ id, ...elementData })

    yield* _await(this.elementRepository.update(element))

    return element
  })

  @modelFlow
  @transaction
  updateAffectedElements = _async(function* (
    this: ElementService,
    elementIds: Array<string>,
  ) {
    yield* _await(
      Promise.all(
        uniq(elementIds).map((id) =>
          this.elementRepository.updateNodes(this.element(id)),
        ),
      ),
    )
  })

  @modelAction
  add = (elementDTO: IElementDTO): IElementModel => {
    console.debug('ElementService.add()', elementDTO)

    let element = this.elements.get(elementDTO.id)

    if (element) {
      element.writeCache(elementDTO)
    } else {
      element = Element.create(elementDTO)
    }

    this.elements.set(elementDTO.id, element)

    return element
  }

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
      this.add({
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
    return this.elements.get(id) || this.clonedElements.get(id)
  }

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => {
        this.moveElementService.detachElementFromElementTree(id)
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
  private get atomService() {
    return getAtomService(this)
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
