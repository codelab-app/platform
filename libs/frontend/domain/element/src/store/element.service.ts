import {
  IAtomService,
  IAuth0Id,
  IComponentDTO,
  ICreateElementDTO,
  ICreatePropMapBindingDTO,
  IElement,
  IElementDTO,
  IElementRef,
  IElementService,
  IInterfaceType,
  isAtomDTO,
  IUpdateElementDTO,
  IUpdatePropMapBindingDTO,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import {
  PropMapBinding,
  PropMapBindingModalService,
} from '@codelab/frontend/domain/prop'
import { getComponentService } from '@codelab/frontend/presenter/container'
import {
  ElementCreateInput,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
import { connectNode, reconnectNode } from '@codelab/shared/data'
import { isNonNullable } from '@codelab/shared/utils'
import omit from 'lodash/omit'
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
  Ref,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { UpdateElementsMutationVariables } from '../graphql/element.endpoints.graphql.gen'
import {
  makeCreateInput,
  makeDuplicateInput,
  makeUpdateInput,
} from './api.utils'
import { elementApi, propMapBindingApi } from './apis'
import { Element } from './element.model'
import {
  CreateElementModalService,
  ElementModalService,
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
    id: idProp,
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElement>()),
    createModal: prop(() => new CreateElementModalService({})),
    updateModal: prop(() => new ElementModalService({})),
    deleteModal: prop(() => new ElementModalService({})),

    createPropMapBindingModal: prop(() => new ElementModalService({})),
    updatePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
    deletePropMapBindingModal: prop(() => new PropMapBindingModalService({})),

    // _atomService: prop<Ref<IAtomService>>(),
  })
  implements IElementService
{
  @computed
  get atomService() {
    return getAtomService(this)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ElementService, where?: ElementWhere) {
    const { elements } = yield* _await(
      elementApi.GetElements({
        where,
      }),
    )

    return elements.map((element) => this.writeCache(element))
  })

  @modelAction
  private writeAtomsCache(elements: Array<IElementDTO>) {
    console.debug('ElementService.writeAtomsCache', elements)

    const atoms = elements
      .map((element) => element.renderAtomType)
      .filter(isAtomDTO)

    return atoms.map((atom) =>
      // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
      this.atomService.writeCache(atom),
    )
  }

  @modelAction
  private writeComponentsCache(elements: Array<IElementDTO>) {
    // Add all non-existing components to the ComponentStore, so we can safely reference them in Element
    const componentService = getComponentService(this)

    const components = elements
      .map((v) => v.parentComponent || v.renderComponentType)
      .filter((component): component is IComponentDTO => Boolean(component))

    components.map((component) => componentService.writeCache(component))
  }

  @modelAction
  public writeCache = (element: IElementDTO): IElement => {
    console.debug('ElementService.writeCache', element)
    this.writeAtomsCache([element])
    this.writeComponentsCache([element])

    let elementModel = this.elements.get(element.id)

    if (elementModel) {
      elementModel.writeCache(element)
    } else {
      elementModel = Element.hydrate(element)
      this.elements.set(element.id, elementModel)
    }

    return elementModel
  }

  /**
   * We need a separate create function for element trees
   */
  @modelFlow
  @transaction
  create = _async(function* (
    this: ElementService,
    data: Array<ICreateElementDTO>,
  ) {
    const input = data.map((element) => makeCreateInput(element))

    const {
      createElements: { elements },
    } = yield* _await(elementApi.CreateElements({ input }))

    if (!elements.length) {
      throw new Error('No elements created')
    }

    return elements.map((element) => this.writeCache(element))
  })

  /**
   * Used to load the entire page tree
   */
  @modelFlow
  getDescendants = _async(function* (
    this: ElementService,
    rootId: IElementRef,
  ) {
    const { elementTrees } = yield* _await(
      elementApi.GetElementTree({ where: { id: rootId } }),
    )

    if (!elementTrees[0]) {
      return []
    }

    const elements = [
      elementTrees[0],
      ...(elementTrees[0]?.descendantElements ?? []),
    ]

    return elements.map((element) => this.writeCache(element))
  })

  @modelAction
  element(id: string) {
    return this.elements.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ElementService,
    element: IEntity,
    input: IUpdateElementDTO,
  ) {
    const update = makeUpdateInput(input)

    const {
      updateElements: {
        elements: [updatedElement],
      },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: element.id },
        update,
      }),
    )

    if (!updatedElement) {
      throw new Error('No elements updated')
    }

    return this.writeCache(updatedElement)
  })

  @modelFlow
  @transaction
  updateElementsPropTransformationJs = _async(function* (
    this: ElementService,
    element: IElement,
    newPropTransformJs: string,
  ) {
    const input: ElementUpdateInput = {
      propTransformationJs: newPropTransformJs,
    }

    return yield* _await(this.update(element, input))
  })

  /**
   * Directly uses generated GraphQL operations
   */
  @modelFlow
  @transaction
  patchElement = _async(function* (
    this: ElementService,
    element: Pick<IElement, 'id'>,
    input: ElementUpdateInput,
  ) {
    const {
      updateElements: {
        elements: [updatedElement],
      },
    } = yield* _await(
      elementApi.UpdateElements({
        where: { id: element.id },
        update: input,
      }),
    )

    if (!updatedElement) {
      throw new Error('No elements updated')
    }

    const elementFromCache = this.element(element.id)

    if (!elementFromCache) {
      throw new Error('Element not found')
    }

    return elementFromCache.writeCache(updatedElement)
  })

  @modelFlow
  @transaction
  detachElementFromElementTree = _async(function* (
    this: ElementService,
    elemenId: string,
  ) {
    /**
Detaches element from an element tree. Will perform 3 conditional checks to see which specific detach to call

- Detach from parent
- Detach from next sibling
- Detach from prev sibling
- Connect prev to next
     */
    const element = this.element(elemenId)

    if (!element) {
      console.warn(`Can't find element id ${elemenId}`)

      return
    }

    /**
parent
  prev
  element
  next
     */
    const updateElementInputs = [
      // Detach from parent
      element.makeDetachParentInput(),
      // Detach from next sibling
      element.makeDetachNextSiblingInput(),
      // Detach from prev sibling
      element.makeDetachPrevSiblingInput(),
    ]

    const updateElementCacheFns: Array<() => void> = [
      // Detach from parent
      element.detachParent(),
      // Attach next to prev
      element.attachPrevToNextSibling(),
      // Detach from next sibling
      element.detachNextSibling(),
      // Detach from prev sibling
      element.detachPrevSibling(),
    ]

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next postion of target element
   */
  @modelFlow
  @transaction
  moveElementAsNextSibling = _async(function* (
    this: ElementService,
    {
      elementId,
      targetElementId,
    }: Parameters<IElementService['moveElementAsNextSibling']>[0],
  ) {
    const element = this.element(elementId)
    const targetElement = this.element(targetElementId)

    if (!element || !targetElement) {
      return
    }

    if (targetElement.nextSiblingId === elementId) {
      return
    }

    yield* _await(this.detachElementFromElementTree(elementId))

    yield* _await(
      this.attachElementAsNextSibling({ elementId, targetElementId }),
    )
  })

  @modelFlow
  @transaction
  moveElementAsFirstChild = _async(function* (
    this: ElementService,
    {
      elementId,
      parentElementId,
    }: Parameters<IElementService['moveElementAsFirstChild']>[0],
  ) {
    const element = this.element(elementId)
    const parentElement = this.element(parentElementId)

    if (!element || !parentElement) {
      return
    }

    yield* _await(this.detachElementFromElementTree(elementId))
    yield* _await(
      this.attachElementAsFirstChild({ elementId, parentElementId }),
    )
  })

  @modelFlow
  @transaction
  createElementAsFirstChild = _async(function* (
    this: ElementService,
    data: ICreateElementDTO,
  ) {
    if (!data.parentElementId) {
      throw new Error('Parent element id doesnt exist')
    }

    const [element] = yield* _await(this.create([data]))

    if (!element) {
      throw new Error('Create element failed')
    }

    yield* _await(
      this.attachElementAsFirstChild({
        elementId: element.id,
        parentElementId: data.parentElementId,
      }),
    )

    return element
  })

  @modelFlow
  @transaction
  createElementAsNextSibling = _async(function* (
    this: ElementService,
    data: ICreateElementDTO,
  ) {
    const [element] = yield* _await(this.create([data]))

    if (!element) {
      throw new Error('Create element failed')
    }

    yield* _await(
      this.attachElementAsNextSibling({
        elementId: element.id,
        targetElementId: String(data.prevSiblingId),
      }),
    )

    return element
  })

  @modelFlow
  @transaction
  attachElementAsNextSibling = _async(function* (
    this: ElementService,
    {
      elementId,
      targetElementId,
    }: Parameters<IElementService['attachElementAsNextSibling']>[0],
  ) {
    const element = this.element(elementId)
    const targetElement = this.element(targetElementId)

    if (!element || !targetElement) {
      return
    }

    const updateElementInputs: Array<UpdateElementsMutationVariables> = []
    const updateElementCacheFns: Array<() => void> = []

    // Attach to parent
    if (targetElement.parentElement) {
      updateElementCacheFns.push(
        element.attachToParent(targetElement.parentElement.id),
      )
    }

    /**
     * [target]-nextSbiling
     * target-[element]-nextSibling
     * element appends to nextSibling
     */
    if (targetElement.nextSibling) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(targetElement.nextSibling.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(targetElement.nextSibling.id),
      )

      /** [element]-nextSibling */
      updateElementInputs.push(
        targetElement.nextSibling.makePrependSiblingInput(element.id),
      )
      updateElementCacheFns.push(
        targetElement.nextSibling.prependSibling(element.id),
      )
    }

    updateElementInputs.push(element.makePrependSiblingInput(targetElement.id))
    updateElementCacheFns.push(element.prependSibling(targetElement.id))

    const updateElementRequests = updateElementInputs
      .filter(isNonNullable)
      .map((input) => elementApi.UpdateElements(input))

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  /**
   * Moves an element to the next position of children[0] of parent children element
   */
  @modelFlow
  @transaction
  attachElementAsFirstChild = _async(function* (
    this: ElementService,
    {
      elementId,
      parentElementId,
    }: Parameters<IElementService['attachElementAsFirstChild']>[0],
  ) {
    const element = this.element(elementId)
    const parentElement = this.element(parentElementId)

    if (!element || !parentElement) {
      return
    }

    const updateElementInputs = []
    const updateElementCacheFns: Array<() => void> = []

    /**
parentElement
  firstChild

parentElement
  [element]
  firstChild

element is new parentElement's first child
     */
    if (parentElement.firstChild) {
      updateElementInputs.push(
        element.makeAppendSiblingInput(parentElement.firstChild.id),
      )
      updateElementCacheFns.push(
        element.appendSibling(parentElement.firstChild.id),
      )
    }

    // attach to parent
    updateElementInputs.push(
      element.makeAttachToParentAsFirstChildInput(parentElementId),
    )
    updateElementCacheFns.push(
      element.attachToParentAsFirstChild(parentElement.id),
    )

    const updateElementRequests = updateElementInputs.map((input) =>
      elementApi.UpdateElements(input),
    )

    yield* _await(Promise.all(updateElementRequests))
    updateElementCacheFns.forEach((fn) => fn())
  })

  @modelFlow
  @transaction
  deleteElementSubgraph = _async(function* (
    this: ElementService,
    root: IElementRef,
  ) {
    const { elementTrees } = yield* _await(
      elementApi.GetElementTree({ where: { id: root } }),
    )

    if (!elementTrees[0]) {
      return []
    }

    const idsToDelete = [
      elementTrees[0].id,
      ...elementTrees[0].descendantElements.map((element) => element.id),
    ]

    const rootElement = this.element(root)

    if (rootElement) {
      yield* _await(this.detachElementFromElementTree(rootElement.id))
    }

    for (const id of idsToDelete.reverse()) {
      this.elements.delete(id)
    }

    const {
      deleteElements: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElements({
        where: {
          id_IN: idsToDelete,
        },
        delete: {
          propMapBindings: [{}],
          props: {},
        },
      }),
    )

    if (nodesDeleted === 0) {
      throw new Error('No elements deleted')
    }

    return idsToDelete
  })

  @modelFlow
  @transaction
  cloneElement = _async(function* (
    this: ElementService,
    targetElement: IElement,
    targetParent: IElement,
  ) {
    const createdElements = new Array<IElement>()
    const oldToNewIdMap = new Map<string, string>()

    const recursiveDuplicate = async (element: IElement, parent: IElement) => {
      const createInput: ElementCreateInput = makeDuplicateInput(element)

      const {
        createElements: {
          elements: [createdElement],
        },
      } = await elementApi.CreateElements({ input: createInput })

      if (!createdElement) {
        throw new Error('No elements created')
      }

      const elementModel = this.writeCache(createdElement)
      const lastChildId = parent.children[parent.children.length - 1]?.id

      if (!lastChildId) {
        await this.attachElementAsFirstChild({
          elementId: elementModel.id,
          parentElementId: parent.id,
        })
      } else {
        await this.attachElementAsNextSibling({
          elementId: elementModel.id,
          targetElementId: lastChildId,
        })
      }

      oldToNewIdMap.set(element.id, elementModel.id)
      createdElements.push(elementModel)

      // re-attach the prop map bindings now that we have the new ids
      for (const propMapBinding of element.propMapBindings.values()) {
        await this.createPropMapBinding(elementModel, {
          elementId: elementModel.id,
          targetElementId: propMapBinding.targetElementId
            ? oldToNewIdMap.get(propMapBinding.targetElementId)
            : undefined,
          targetKey: propMapBinding.targetKey,
          sourceKey: propMapBinding.sourceKey,
        })
      }

      for (const child of element.children) {
        await recursiveDuplicate(child, elementModel)
      }

      return elementModel
    }

    yield* _await(recursiveDuplicate(targetElement, targetParent))

    return createdElements
  })

  @modelFlow
  @transaction
  convertElementToComponent = _async(function* (
    this: ElementService,
    element: Element,
    auth0Id: IAuth0Id,
  ) {
    if (!element.parentElement) {
      throw new Error("Can't convert root element")
    }

    const name = element.label
    const elementId = element.id
    const parentElement = element.parentElement
    const prevSibling = element.prevSibling
    const componentService = getComponentService(this)

    // 1. create the component with predefined root element
    const [createdComponent] = yield* _await(
      componentService.create([
        {
          auth0Id,
          id: v4(),
          name,
          rootElementId: elementId,
        },
      ]),
    )

    if (!createdComponent) {
      return
    }

    // 2. detach the element from the element tree
    yield* _await(this.detachElementFromElementTree(elementId))

    // 3. create a new element as an instance of the component
    const [newElement] = yield* _await(
      this.create([
        {
          name,
          renderComponentTypeId: createdComponent?.id,
          parentElementId: parentElement.id,
        },
      ]),
    )

    if (!newElement) {
      return
    }

    // 4. attach the new element to the element tree
    if (!prevSibling) {
      yield* _await(
        this.attachElementAsFirstChild({
          elementId: newElement.id,
          parentElementId: parentElement.id,
        }),
      )
    } else {
      yield* _await(
        this.attachElementAsNextSibling({
          elementId: newElement.id,
          targetElementId: prevSibling.id,
        }),
      )
    }

    return newElement
  })

  @modelFlow
  @transaction
  createPropMapBinding = _async(function* (
    this: ElementService,
    element: IElement,
    createInput: ICreatePropMapBindingDTO,
  ) {
    const {
      createPropMapBindings: {
        propMapBindings: [createdPropMapBinding],
      },
    } = yield* _await(
      propMapBindingApi.CreatePropMapBindings({
        input: {
          sourceKey: createInput.sourceKey.trim(),
          targetKey: createInput.targetKey.trim(),
          element: connectNode(element.id),
          targetElement: connectNode(createInput.targetElementId),
        },
      }),
    )

    if (!createdPropMapBinding) {
      throw new Error('No prop map bindings created')
    }

    const propMapBinding = PropMapBinding.hydrate(createdPropMapBinding)

    element.addPropMapBinding(propMapBinding)

    return propMapBinding
  })

  @modelFlow
  @transaction
  updatePropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
    propMapBinding: PropMapBinding,
    updateData: IUpdatePropMapBindingDTO,
  ) {
    const {
      updatePropMapBindings: {
        propMapBindings: [updatedPropMapBinding],
      },
    } = yield* _await(
      propMapBindingApi.UpdatePropMapBindings({
        where: { id: propMapBinding.id },
        update: {
          sourceKey: updateData.sourceKey,
          targetKey: updateData.targetKey,
          targetElement: reconnectNode(updateData.targetElementId),
        },
      }),
    )

    if (!updatedPropMapBinding) {
      throw new Error('No prop map bindings updated')
    }

    propMapBinding.writeCache(updatedPropMapBinding)

    return propMapBinding
  })

  @modelFlow
  @transaction
  deletePropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
    propMapBinding: PropMapBinding,
  ) {
    const {
      deletePropMapBindings: { nodesDeleted },
    } = yield* _await(
      propMapBindingApi.DeletePropMapBindings({
        where: { id: propMapBinding.id },
      }),
    )

    if (nodesDeleted === 0) {
      throw new Error('No prop map bindings deleted')
    }

    element.removePropMapBinding(propMapBinding)

    return propMapBinding
  })

  /**
   * If we change interface, the prop data should also be changed
   */
  @modelFlow
  @transaction
  removeDeletedPropDataFromElements = _async(function* (
    this: ElementService,
    interfaceType: IInterfaceType,
    propKey: string,
  ) {
    const elementsThatUseTheProp = yield* _await(
      this.getAll({ renderAtomType: { api: { id: interfaceType.id } } }),
    )

    const promises = elementsThatUseTheProp.map((element) => {
      const updatedProps = omit(element.props?.data, propKey)

      return this.patchElement(element, {
        props: {
          update: {
            node: {
              data: JSON.stringify(updatedProps),
            },
          },
        },
      })
    })

    yield* _await(Promise.all(promises))
  })
}
