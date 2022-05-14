import { getAtomService } from '@codelab/frontend/modules/atom'
import { getComponentService } from '@codelab/frontend/presenter/container'
import {
  ElementCreateInput,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import {
  IAuth0Id,
  IComponentDTO,
  ICreateElementDTO,
  ICreatePropMapBindingDTO,
  IElement,
  IElementDTO,
  IElementRef,
  IElementService,
  IPropData,
  isAtomDTO,
  IUpdateElementDTO,
  IUpdatePropMapBindingDTO,
  MoveData,
} from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
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
import { ElementTree } from './element-tree.model'
import { PropMapBinding } from './prop-map-binding.model'
import { PropMapBindingModalService } from './prop-map-binding-modal.service'

/**
 * Element stores a tree of elements locally using an ElementTree
 * and handles the communication with the server.
 *
 * We will instantiate multiple ElementServices, one for each type of elements
 *
 * - Elements part of rootTree
 * - Elements part of providerTree
 * - Elements part of components
 *
 */
@model('@codelab/ElementService')
export class ElementService
  extends Model({
    elementTree: prop(() => new ElementTree({})),
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
  })
  implements IElementService
{
  /**
   * Used to load the entire page tree
   */
  @modelFlow
  getTree = _async(function* (
    this: ElementService,
    rootId: IElementRef,
    mainTree,
  ) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementGraph({ input: { rootId } }),
    )

    const ids = [elementGraph.id, ...elementGraph.descendants]

    const { elements } = yield* _await(
      elementApi.GetElements({
        where: {
          id_IN: ids,
        },
      }),
    )

    const elementModels = this.hydrateOrUpdateCache(elements)

    this.elementTree.buildTree(elementModels, mainTree)

    return this.elementTree
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ElementService, where?: ElementWhere) {
    const { elements } = yield* _await(
      elementApi.GetElements({
        where,
      }),
    )

    return this.hydrateOrUpdateCache(elements)
  })

  @modelAction
  private updateAtomsCache(elements: Array<IElementDTO>) {
    // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
    const atomService = getAtomService(this)
    const atoms = elements.map((element) => element.atom).filter(isAtomDTO)

    atomService.updateCache(atoms)
  }

  @modelAction
  private updateComponentsCache(elements: Array<IElementDTO>) {
    // Add all non-existing components to the ComponentStore, so we can safely reference them in Element
    const componentService = getComponentService(this)

    const allComponents = elements
      .map((v) => v.component)
      .filter(Boolean) as Array<IComponentDTO>

    componentService.updateCaches(allComponents)
  }

  @modelAction
  public hydrateOrUpdateCache = (elements: Array<IElementDTO>) => {
    this.updateAtomsCache(elements)
    this.updateComponentsCache(elements)

    return elements.map((element) => {
      if (this.elements.has(element.id)) {
        const elementModel = this.elements.get(element.id)!

        return elementModel.updateCache(element)
      }

      const elementModel = Element.hydrate(element)
      this.elements.set(element.id, elementModel)

      return elementModel
    })
  }

  @modelFlow
  @transaction
  getElementGraph = _async(function* (this: ElementService, rootId: string) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementGraph({
        input: {
          rootId,
        },
      }),
    )

    return elementGraph
  })

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

    const elementModels = this.hydrateOrUpdateCache(elements)

    this.elementTree.buildTree(elementModels, false)

    return elementModels
  })

  @modelAction
  element(id: string) {
    return this.elements?.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
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
    element: IElement,
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
    element: IElement,
    newCss: string,
  ) {
    const input: ElementUpdateInput = { css: newCss }

    return yield* _await(this.patchElement(element, input))
  })

  @modelFlow
  @transaction
  moveElement = _async(function* (
    this: ElementService,
    targetElementId: IElementRef,
    { parentElementId, order }: MoveData,
  ) {
    /*
     * It's important that we do this locally first, because we can do some validations
     * that would otherwise require a custom resolver to do
     */
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
    element: IElement,
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

    this.updateAtomsCache([updatedElement])
    element.updateCache(updatedElement)

    return element
  })

  @modelFlow
  @transaction
  deleteElementSubgraph = _async(function* (
    this: ElementService,
    root: IElementRef,
  ) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementGraph({ input: { rootId: root } }),
    )

    const idsToDelete = [elementGraph.id, ...elementGraph.descendants]

    for (const id of idsToDelete.reverse()) {
      const ele = this.elements.get(id)
      this.elements.delete(id)
      // ele?.parentElement?.removeChild(ele)
    }

    const {
      deleteElements: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElements({
        where: {
          id_IN: idsToDelete,
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
  duplicateElement = _async(function* (
    this: ElementService,
    targetElement: Element,
    auth0Id: IAuth0Id,
  ) {
    if (!targetElement.parentElement) {
      throw new Error("Can't duplicate root element")
    }

    const oldToNewIdMap = new Map<string, string>()

    const recursiveDuplicate = async (element: IElement, parentId: string) => {
      const createInput: ElementCreateInput = makeDuplicateInput(
        element,
        parentId,
        auth0Id,
      )

      const {
        createElements: {
          elements: [createdElement],
        },
      } = await elementApi.CreateElements({ input: createInput })

      if (!createdElement) {
        throw new Error('No elements created')
      }

      // const createdElementModel = this.hydrateOrUpdateCache([createdElement])
      // const [elementModel] = this.elementTree.buildTree(createdElementModel)
      //
      // oldToNewIdMap.set(element.id, elementModel.id)
      //
      // for (const child of element.childrenSorted) {
      //   await recursiveDuplicate(child, elementModel.id)
      // }
      //
      // return elementModel
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
    auth0Id: IAuth0Id,
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
              id: v4(),
              name: element.label,
              owner: { connect: { where: { node: { auth0Id } } } },
              rootElement: { connect: { where: { node: { id: element.id } } } },
            },
          },
        },
      }),
    )

    if (!element.component) {
      throw new Error('Could not find component')
    }

    // 2. Load component so we can use reference
    yield* _await(getComponentService(this).getOne(element.component.id))

    // 3. Make an intermediate element with instance of the Component
    yield* _await(
      this.create([
        {
          name: element.label,
          instanceOfComponentId: element.component.id,
          parentElementId: parentId,
          order,
        },
      ]),
    )
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

    propMapBinding.updateCache(updatedPropMapBinding)

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
