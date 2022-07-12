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
  IElementTree,
  isAtomDTO,
  ITypeKind,
  IUpdateElementDTO,
  IUpdatePropMapBindingDTO,
} from '@codelab/shared/abstract/core'
import { IEntity, Nullable } from '@codelab/shared/abstract/types'
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
import { elementRef } from './element.ref'
import {
  CreateElementModalService,
  ElementModalService,
} from './element-modal.service'
import { PropMapBinding } from './prop-map-binding.model'
import { PropMapBindingModalService } from './prop-map-binding-modal.service'

/**
 * We will have a single ElementService that contains all elements from
 *
 * - PageElementTree
 * - ComponentElementTree
 *
 */
@model('@codelab/ElementService')
export class ElementService
  extends Model({
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
  public hydrateOrUpdateCache = (
    elements: Array<IElementDTO>,
  ): Array<IElement> => {
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

    return this.hydrateOrUpdateCache(elements)
  })

  /**
   * Used to load the entire page tree
   */
  @modelFlow
  getDescendants = _async(function* (
    this: ElementService,
    rootId: IElementRef,
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

    return this.hydrateOrUpdateCache(elements)
  })

  @modelAction
  element(id: string) {
    return this.elements?.get(id)
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

    return this.hydrateOrUpdateCache([updatedElement])[0]
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

    return element.updateCache(updatedElement)
  })

  /**
   * Moves an element to a different parent and/or order
   */
  @modelAction
  @transaction
  moveElement = (elementId: string, newParentId: string, newOrder?: number) => {
    const element = this.element(elementId)

    if (!element) {
      throw new Error(`Element ${elementId} not found`)
    }

    const existingParent = element.parentElement
    const newParent = this.element(newParentId)

    if (!newParent) {
      throw new Error(`Parent element ${newParentId} not found`)
    }

    // make sure it won't be a child of itself or a descendant
    if (newParent.id === element.id || element.findDescendant(newParent.id)) {
      throw new Error(`Cannot move element ${elementId} to itself`)
    }

    if (existingParent) {
      existingParent.detachChild(element)
    }

    newOrder = newOrder ?? element.parentElement?.lastChildOrder ?? 0
    element.setOrderInParent(newOrder ?? null)
    newParent.addChild(element.id, elementRef(element))

    const input: ElementUpdateInput = {
      parentElement: {
        disconnect: { where: {} },
        connect: {
          edge: { order: newOrder },
          where: { node: { id: newParentId } },
        },
      },
    }

    return this.patchElement(element, input)
  }

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
  duplicateElement = _async(function* (
    this: ElementService,
    targetElement: Element,
    auth0Id: IAuth0Id,
    elementTree: IElementTree | null,
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

      const createdElementModel = this.hydrateOrUpdateCache([createdElement])
      const elementModel = createdElementModel[0]

      if (elementTree) {
        elementTree.buildTree(createdElementModel)
      }

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

      const duplicated = elementTree?.element(newId)

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
    elementTree: Nullable<IElementTree>,
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
              rootElement: {
                connect: { where: { node: { id: element.id } } },
              },
              api: {
                create: {
                  node: {
                    id: v4(),
                    name: `${element.label} API`,
                    fields: {},
                    kind: ITypeKind.InterfaceType,
                    apiOfAtoms: {},
                    owner: { connect: { where: { node: { auth0Id } } } },
                  },
                },
              },
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
    const [newElement] = yield* _await(
      this.create([
        {
          name: element.label,
          instanceOfComponentId: element.component.id,
          parentElementId: parentId,
          order,
        },
      ]),
    )

    if (elementTree) {
      elementTree.buildTree([newElement])
    }
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
