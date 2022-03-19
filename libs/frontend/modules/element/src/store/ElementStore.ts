import { Atom, AtomStore } from '@codelab/frontend/modules/atom'
import { ModalStore } from '@codelab/frontend/shared/utils'
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
import { elementApi } from './apis'
import { makeCreateInput, makeUpdateInput } from './apiUtils'
import { ElementModel } from './ElementModel'
import { ElementTree } from './ElementTree'

/**
 * Element stores a tree of elements locally using an ElementTree
 * and handles the communication with the server.
 */
@model('@codelab/ElementStore')
export class ElementStore extends Model({
  elementTree: prop(() => new ElementTree({})),

  createModal: prop(() => new CreateElementModalStore({})),
  updateModal: prop(() => new ElementModalStore({})),
  deleteModal: prop(() => new ElementModalStore({})),

  // We need a reference to the atom store to get/set atoms
  atomStore: prop<Ref<AtomStore>>(),
}) {
  @modelFlow
  @transaction
  getTree = _async(function* (this: ElementStore, rootId: string) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementsGraph({ input: { rootId } }),
    )

    // Add all non-existing atoms to the AtomStore, so we can reference them safely in Element
    for (const vertex of elementGraph.vertices) {
      if (!vertex.atom) {
        continue
      }

      const existing = this.atomStore.current.atom(vertex.atom.id)

      if (existing) {
        existing.updateFromFragment(vertex.atom)
      } else {
        this.atomStore.current.addAtom(Atom.fromFragment(vertex.atom))
      }
    }

    this.elementTree.updateFromFragment(elementGraph)
  })

  @modelFlow
  @transaction
  createElement = _async(function* (
    this: ElementStore,
    input: CreateElementInput,
  ) {
    input = {
      ...input,
      parentElementId:
        input.parentElementId || this.elementTree.root?.current.id, // default to the root element if not parent is set
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

    const element = ElementModel.fromFragment(createdElement)
    this.elementTree.addElement(element)
  })

  @modelFlow
  @transaction
  updateElement = _async(function* (
    this: ElementStore,
    element: ElementModel,
    input: UpdateElementInput,
  ) {
    const updateInput = makeUpdateInput(input)

    return yield* _await(this.patchElement(element, updateInput))
  })

  @modelFlow
  @transaction
  updateElementsPropTransformationJs = _async(function* (
    this: ElementStore,
    element: ElementModel,
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
    this: ElementStore,
    element: ElementModel,
    newCss: string,
  ) {
    const input: ElementUpdateInput = { css: newCss }

    return yield* _await(this.patchElement(element, input))
  })

  @modelFlow
  @transaction
  moveElement = _async(function* (
    this: ElementStore,
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

    if (
      targetElement.parentElement?.id === targetElementId &&
      targetElement.order === order
    ) {
      // everything is the same, no need to call the server
      return
    }

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
    this: ElementStore,
    element: ElementModel,
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
    this: ElementStore,
    element: ElementModel,
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
    this: ElementStore,
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
}

@model('codelab/ElementModalStore')
class ElementModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Ref<ElementModel>>>(ModalStore),
  props: {},
})) {
  @computed
  get element() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/CreateElementModalStore')
class CreateElementModalStore extends ExtendedModel(() => ({
  baseModel:
    modelClass<ModalStore<{ parentElement?: Ref<ElementModel> }>>(ModalStore),
  props: {},
})) {
  @computed
  get parentElement() {
    return this.metadata?.parentElement?.current ?? null
  }
}
