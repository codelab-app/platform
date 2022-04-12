import { ModalService } from '@codelab/frontend/shared/utils'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  ICreateElementDTO,
  ICreatePropMapBindingDTO,
  IPropData,
  IUpdateElementDTO,
  IUpdatePropMapBindingDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  ExtendedModel,
  Model,
  model,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { MoveData } from '../use-cases/element/move-element/types'
import {
  makeCreateInput,
  makeDuplicateInput,
  makeUpdateInput,
} from './api.utils'
import { elementApi, propMapBindingApi } from './apis'
import { Element } from './element.model'
import { ElementTree } from './element-tree.model'
import { PropMapBinding } from './prop-map-binding.model'

export interface WithElementService {
  elementService: ElementService
}

/**
 * Element stores a tree of elements locally using an ElementTree
 * and handles the communication with the server.
 */
@model('codelab/ElementService')
export class ElementService extends Model({
  elementTree: prop(() => new ElementTree({})),
  elements: prop(() => objectMap<Element>()),

  createModal: prop(() => new CreateElementModalService({})),
  updateModal: prop(() => new ElementModalService({})),
  deleteModal: prop(() => new ElementModalService({})),

  createPropMapBindingModal: prop(() => new ElementModalService({})),
  updatePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
  deletePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
}) {
  @modelFlow
  getTree = _async(function* (this: ElementService, rootId: string) {
    const { elementGraphV2 } = yield* _await(
      elementApi.GetElementGraphV2({ input: { rootId } }),
    )

    const ids = [elementGraphV2.id, ...elementGraphV2.descendants]

    const { elements } = yield* _await(
      elementApi.GetElements({
        where: {
          id_IN: ids,
        },
      }),
    )

    this.elementTree.updateFromFragment(
      { vertices: elements, edges: [] },
      rootId,
    )

    return this.elementTree
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ElementService, ids: Array<string> = []) {
    const { elements } = yield* _await(
      elementApi.GetElements({
        where: {
          id_IN: ids,
        },
      }),
    )

    return elements.map((element) => {
      if (this.elements.has(element.id)) {
        // return throwIfUndefined(this.elements.get(element.id))
        return element
      }

      const elementModel = Element.fromFragment(element)
      this.elements.set(element.id, elementModel)

      // return elementModel
      return element
    })
  })

  @modelFlow
  @transaction
  createElement = _async(function* (
    this: ElementService,
    input: ICreateElementDTO,
  ) {
    input = {
      ...input,
      parentElementId: input.parentElementId || this.elementTree.root?.id, // default to the root element if not parent is set
    }

    const createInput: ElementCreateInput = makeCreateInput(input)

    const {
      createElements: {
        elements: [createdElement],
      },
    } = yield* _await(elementApi.CreateElements({ input: createInput }))

    if (!createdElement) {
      throw new Error('No elements created')
    }

    const [element] = this.elementTree.addOrUpdateAll([createdElement])

    return element
  })

  @modelFlow
  @transaction
  updateElement = _async(function* (
    this: ElementService,
    element: Element,
    input: IUpdateElementDTO,
  ) {
    const updateInput = makeUpdateInput(input)

    element.setName(input.name)

    return yield* _await(this.patchElement(element, updateInput))
  })

  @modelFlow
  @transaction
  updateElementsPropTransformationJs = _async(function* (
    this: ElementService,
    element: Element,
    newPropTransformJs: string,
  ) {
    const input: ElementUpdateInput = {
      propTransformationJs: newPropTransformJs,
    }

    return yield* _await(this.patchElement(element, input))
  })

  @modelFlow
  @transaction
  updateElementCss = _async(function* (
    this: ElementService,
    element: Element,
    newCss: string,
  ) {
    const input: ElementUpdateInput = { css: newCss }

    return yield* _await(this.patchElement(element, input))
  })

  @modelFlow
  @transaction
  moveElement = _async(function* (
    this: ElementService,
    targetElementId: string,
    { parentElementId, order }: MoveData,
  ) {
    // It's important that we do this locally first, because we can do some validations
    // that would otherwise require a custom resolver to do
    const targetElement = this.elementTree.moveElement(
      targetElementId,
      parentElementId,
      order,
    )

    const input: ElementUpdateInput = {
      parentElement: {
        disconnect: { where: {} },
        connect: { edge: { order }, where: { node: { id: parentElementId } } },
      },
    }

    return yield* _await(this.patchElement(targetElement, input))
  })

  @modelFlow
  @transaction
  updateElementProps = _async(function* (
    this: ElementService,
    element: Element,
    data: IPropData,
  ) {
    const createOrUpdate = element.props ? 'update' : 'create'

    const input: ElementUpdateInput = {
      props: { [createOrUpdate]: { node: { data: JSON.stringify(data) } } },
    }

    return yield* _await(this.patchElement(element, input))
  })

  /**
   * Helper functions for common update operations
   */
  @modelFlow
  @transaction
  private patchElement = _async(function* (
    this: ElementService,
    element: Element,
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

    element.updateFromFragment(updatedElement)

    return element
  })

  @modelFlow
  @transaction
  deleteElementsSubgraph = _async(function* (
    this: ElementService,
    rootId: string,
  ) {
    const deletedRoot = this.elementTree.element(rootId)

    if (!deletedRoot) {
      throw new Error('Deleted element not found')
    }

    this.elementTree.removeElementAndDescendants(deletedRoot)

    const {
      deleteElementsSubgraph: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElementsSubgraph({ where: { id: rootId } }),
    )

    if (nodesDeleted === 0) {
      throw new Error('No elements deleted')
    }

    return deletedRoot
  })

  @modelFlow
  @transaction
  duplicateElement = _async(function* (
    this: ElementService,
    targetElement: Element,
    userId: string,
  ) {
    if (!targetElement.parentElement) {
      throw new Error("Can't duplicate root element")
    }

    const oldToNewIdMap = new Map<string, string>()

    const recursiveDuplicate = async (element: Element, parentId: string) => {
      const createInput: ElementCreateInput = makeDuplicateInput(
        element,
        parentId,
        userId,
      )

      const {
        createElements: {
          elements: [createdElement],
        },
      } = await elementApi.CreateElements({ input: createInput })

      if (!createdElement) {
        throw new Error('No elements created')
      }

      const [elementModel] = this.elementTree.addOrUpdateAll([createdElement])

      oldToNewIdMap.set(element.id, elementModel.id)

      for (const child of element.childrenSorted) {
        await recursiveDuplicate(child, elementModel.id)
      }

      return elementModel
    }

    yield* _await(
      recursiveDuplicate(targetElement, targetElement.parentElement.id),
    )

    // re-attach the prop map bindings now that we have the new ids
    const allInputs = [targetElement, ...targetElement.descendants]

    for (const inputElement of allInputs) {
      const newId = oldToNewIdMap.get(inputElement.id)

      if (!newId) {
        throw new Error(`Could not find new id for ${inputElement.id}`)
      }

      const duplicated = this.elementTree.element(newId)

      if (!duplicated) {
        throw new Error(`Could not find duplicated element ${newId}`)
      }

      for (const propMapBinding of inputElement.propMapBindings.values()) {
        yield* _await(
          this.createPropMapBinding(duplicated, {
            elementId: newId,
            targetElementId: propMapBinding.targetElement
              ? oldToNewIdMap.get(propMapBinding.targetElement.id)
              : undefined,
            targetKey: propMapBinding.targetKey,
            sourceKey: propMapBinding.sourceKey,
          }),
        )
      }
    }
  })

  @modelFlow
  @transaction
  convertElementToComponent = _async(function* (
    this: ElementService,
    element: Element,
    userId: string,
  ) {
    if (!element.parentElement) {
      throw new Error("Can't convert root element")
    }

    // 1. Attach a Component to the Element and detach it from the parent
    const parentId = element.parentElement.id

    const order =
      element.orderInParent ?? element.parentElement.lastChildOrder + 1

    element.parentElement.removeChild(element)

    yield* _await(
      this.patchElement(element, {
        parentElement: { disconnect: { where: {} } },
        component: {
          create: {
            node: {
              name: element.label,
              owner: { connect: { where: { node: { auth0Id: userId } } } },
            },
          },
        },
      }),
    )

    if (!element.component) {
      throw new Error('Could not find component')
    }

    // 2. Make an intermediate element with instance of the Component
    yield* _await(
      this.createElement({
        name: element.label,
        instanceOfComponentId: element.component.id,
        parentElementId: parentId,
        order,
      }),
    )
  })

  @modelFlow
  @transaction
  createPropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
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
          element: {
            connect: { where: { node: { id: element.id } } },
          },
          targetElement: createInput.targetElementId
            ? {
                connect: {
                  where: { node: { id: createInput.targetElementId } },
                },
              }
            : undefined,
        },
      }),
    )

    if (!createdPropMapBinding) {
      throw new Error('No prop map bindings created')
    }

    const propMapBinding = PropMapBinding.fromFragment(createdPropMapBinding)

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
          targetElement: {
            connect: { where: { node: { id: updateData.targetElementId } } },
            disconnect: { where: {} },
          },
        },
      }),
    )

    if (!updatedPropMapBinding) {
      throw new Error('No prop map bindings updated')
    }

    propMapBinding.updateFromFragment(updatedPropMapBinding)

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
}

@model('codelab/ElementModalService')
class ElementModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Element>>>(ModalService),
  props: {},
})) {
  @computed
  get element() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/CreateElementModalService')
class CreateElementModalService extends ExtendedModel(() => ({
  baseModel:
    modelClass<ModalService<{ parentElement?: Ref<Element> }>>(ModalService),
  props: {},
})) {
  @computed
  get parentElement() {
    return this.metadata?.parentElement ?? null
  }
}

@model('codelab/PropMapBindingModalService')
class PropMapBindingModalService extends ExtendedModel(() => ({
  baseModel: modelClass<
    ModalService<{
      propMapBinding: Ref<PropMapBinding>
      element: Ref<Element>
    }>
  >(ModalService),
  props: {},
})) {
  @computed
  get propMapBinding() {
    return this.metadata?.propMapBinding.current ?? null
  }

  @computed
  get element() {
    return this.metadata?.element.current ?? null
  }
}
