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
import { connectId, disconnectId } from '@codelab/shared/data'
import {
  _async,
  _await,
  getSnapshot,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { disconnect } from 'process'
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
      .map((v) => v.component || v.instanceOfComponent)
      .filter(Boolean) as Array<IComponentDTO>

    componentService.updateCache(allComponents)
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
    const input = data.map((element) =>
      makeCreateInput(
        element,
        element.prevSiblingId ? this.element(element.prevSiblingId) : undefined,
        element.parentElementId
          ? this.element(element.parentElementId)
          : undefined,
      ),
    )

    const {
      createElements: { elements },
    } = yield* _await(elementApi.CreateElements({ input }))

    if (!elements.length) {
      throw new Error('No elements created')
    }

    const hydratedElements = this.hydrateOrUpdateCache(elements)
    hydratedElements.forEach((e) => e.linkSibling())

    return hydratedElements
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

    return elementFromCache.updateCache(updatedElement)
  })

  @modelFlow
  @transaction
  linkElement = _async(function* (
    this: ElementService,
    element: IElement,
    prevSiblingId?: string,
    nextSiblingId?: string,
  ) {
    const promises = []

    // a -> [b] -> c
    // a link b, up cache a
    // b link c, up cache b

    if (nextSiblingId) {
      promises.push(
        this.patchElement(
          { id: nextSiblingId },
          {
            prevSibling: connectId(element?.id),
          },
        ),
      )

      // element.nextSiblingId = nextSiblingId
    }

    if (prevSiblingId) {
      promises.push(
        this.patchElement(
          { id: prevSiblingId },
          {
            nextSibling: connectId(element?.id),
          },
        ),
      )

      // element.prevSibling = prevSiblingId
    }

    return yield* _await(Promise.all(promises))
  })

  @modelFlow
  @transaction
  unlinkElement = _async(function* (this: ElementService, element: IElement) {
    const promises = []

    // delete anywhere but not the end
    // x - y - [removed]
    // should be x - [removed] - y
    if (element.nextSibling) {
      // element.nextSibling.prevSiblingId = element.prevSibling?.id ?? null
      promises.push(
        this.patchElement(element.nextSibling, {
          prevSibling: {
            // disconnect [removed]
            disconnect: {
              where: { node: { id: element.id } },
            },
            // link y -> x
            ...connectId(element.prevSibling?.id),
          },
        }),
      )

      if (element.prevSibling) {
        // ^ remote data affected by above
        // update cache only
        // link x - y
        element.prevSibling.nextSiblingId = element.nextSiblingId
      }
    } else if (element.prevSibling) {
      // if next sibling is not available = add at the end
      // x - [remove] -> disconect [remove]
      promises.push(
        this.patchElement(element.prevSibling, {
          nextSibling: {
            disconnect: {
              where: { node: { id: element.id } },
            },
          },
        }),
      )
    }

    // tree = [removed] - x - y (no prev),
    if (!element.prevSibling && element.parentElement) {
      // this is root, link to its next sibling because we delete it
      // if no next sibling, then parent children tree is empty
      // element.parentElement.childrenRootId = element.nextSibling?.id ?? null
      promises.push(
        this.patchElement(element.parentElement, {
          childrenRoot: {
            // disconnect [removed]
            disconnect: {
              where: { node: { id: element.id } },
            },
            // set tree children root = x, x is empty is ok
            ...connectId(element.nextSibling?.id),
          },
        }),
      )
    }

    element.nextSiblingId = null
    element.prevSiblingId = null

    return yield* _await(Promise.all(promises))
  })

  /**
   * Moves an element to the next postion of target element
   */
  @modelFlow
  @transaction
  moveElementNextTo = _async(function* (
    this: ElementService,
    elementId: string,
    targetElementId: string,
  ) {
    const element = this.element(elementId)
    const targetElement = this.element(targetElementId)

    if (!element || !targetElement) {
      return
    }

    // console.log(
    //   'current el',
    //   [...this.elements.values()].map((e) => getSnapshot(e)),
    // )

    yield* _await(this.unlinkElement(element))
    yield* _await(
      this.linkElement(
        element,
        targetElement.id,
        targetElement?.nextSibling?.id,
      ),
    )
  })

  /**
   * Moves an element to the next position of children[0] of parent children element
   */
  @modelFlow
  @transaction
  moveElementInto = _async(function* (
    this: ElementService,
    elementId: string,
    parentElementId: string,
  ) {
    console.log('moveElementInto')

    const element = this.element(elementId)
    const parentElement = this.element(parentElementId)

    if (!element || !parentElement) {
      return
    }

    const oldChildrenRootId = parentElement.childrenRoot?.id

    console.log(
      'current el',
      [...this.elements.values()].map((e) => getSnapshot(e)),
    )

    yield* _await(this.unlinkElement(element))

    console.log(
      'after unlink',
      [...this.elements.values()].map((e) => getSnapshot(e)),
    )

    console.log('children root process', {
      parentElement: getSnapshot(parentElement),
    })

    yield* _await(
      this.patchElement(parentElement, {
        childrenRoot: {
          // disconnect [removed]
          ...disconnectId(parentElement.childrenRoot?.id),
          // set tree children root = x, x is empty is ok
          ...connectId(elementId),
        },
      }),
    )

    console.log(
      'after link to the correct place',
      [...this.elements.values()].map((e) => getSnapshot(e)),
    )

    // the previous one
    if (oldChildrenRootId) {
      yield* _await(this.linkElement(element, undefined, oldChildrenRootId))
    }

    console.log(
      'after link to the correct place',
      [...this.elements.values()].map((e) => getSnapshot(e)),
    )
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
    const rootElement = this.element(root)

    if (rootElement) {
      yield* _await(this.unlinkElement(rootElement))
      // rootElement.unlinkSibling()
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

    if (!elementTree) {
      throw new Error('Element is not attached to a tree')
    }

    // 2. Attach a Component to the Element and detach it from the parent
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

    // 3. Load component so we can use reference
    const componentService = getComponentService(this)

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
