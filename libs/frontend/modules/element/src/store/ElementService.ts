import { Atom, atomServiceContext } from '@codelab/frontend/modules/atom'
import { ModalService } from '@codelab/frontend/shared/utils'
import {
  CreatePropMapBindingInput,
  UpdatePropMapBindingData,
} from '@codelab/shared/abstract/codegen'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen-v2'
import { PropsData } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  ExtendedModel,
  frozen,
  Model,
  model,
  modelClass,
  modelFlow,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { CreateElementInput } from '../use-cases/element/create-element/createElementSchema'
import { MoveData } from '../use-cases/element/move-element/types'
import { UpdateElementInput } from '../use-cases/element/update-element/updateElementSchema'
import { elementApi, propMapBindingApi } from './apis'
import { makeCreateInput, makeUpdateInput } from './apiUtils'
import { Element } from './Element'
import { ElementTree } from './ElementTree'
import { PropMapBinding } from './PropMapBinding'

export type WithElementService = {
  elementService: ElementService
}

/**
 * Element stores a tree of elements locally using an ElementTree
 * and handles the communication with the server.
 */
@model('@codelab/ElementService')
export class ElementService extends Model({
  elementTree: prop(() => new ElementTree({})),

  createModal: prop(() => new CreateElementModalService({})),
  updateModal: prop(() => new ElementModalService({})),
  deleteModal: prop(() => new ElementModalService({})),

  createPropMapBindingModal: prop(() => new ElementModalService({})),
  updatePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
  deletePropMapBindingModal: prop(() => new PropMapBindingModalService({})),
}) {
  @modelFlow
  @transaction
  getTree = _async(function* (this: ElementService, rootId: string) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementsGraph({ input: { rootId } }),
    )

    // Add all non-existing atoms to the AtomStore, so we can reference them safely in Element
    for (const vertex of elementGraph.vertices) {
      if (!vertex.atom) {
        continue
      }

      const atomStore = atomServiceContext.get(this)

      if (!atomStore) {
        throw new Error('atomServiceContext is not defined')
      }

      const existing = atomStore.atom(vertex.atom.id)

      if (existing) {
        existing.updateFromFragment(vertex.atom)
      } else {
        atomStore.addAtom(Atom.fromFragment(vertex.atom))
      }
    }

    this.elementTree.updateFromFragment(elementGraph)

    return this.elementTree
  })

  @modelFlow
  @transaction
  createElement = _async(function* (
    this: ElementService,
    input: CreateElementInput,
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

    const element = Element.fromFragment(createdElement)

    if (input.parentElementId) {
      this.elementTree
        .element(input.parentElementId)
        ?.addChild(element, input.order)
    }

    this.elementTree.addElement(element)

    return element
  })

  @modelFlow
  @transaction
  updateElement = _async(function* (
    this: ElementService,
    element: Element,
    input: UpdateElementInput,
  ) {
    const updateInput = makeUpdateInput(input)

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
    data: PropsData,
  ) {
    const createOrUpdate = element.props ? 'update' : 'create'

    element.props?.setData(frozen(data))

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
    const root = this.elementTree.element(rootId)

    if (!root) {
      throw new Error('Deleted element not found')
    }

    this.elementTree.removeElementAndDescendants(root)

    const {
      deleteElementsSubgraph: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElementsSubgraph({ where: { id: rootId } }),
    )

    if (nodesDeleted === 0) {
      throw new Error('No elements deleted')
    }

    return root
  })

  @modelFlow
  @transaction
  createPropMapBinding = _async(function* (
    this: ElementService,
    element: Element,
    createInput: CreatePropMapBindingInput,
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
    updateData: UpdatePropMapBindingData,
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
    return this.metadata?.parentElement?.current ?? null
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
