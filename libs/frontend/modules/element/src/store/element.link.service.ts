import { getElementService } from '@codelab/frontend/presenter/container'
import {
  ICreatePropMapBindingDTO,
  IElement,
  IElementLinkService,
  IElementRef,
  IUpdatePropMapBindingDTO,
} from '@codelab/shared/abstract/core'
import { connectId, disconnectId } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  getSnapshot,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { elementApi, propMapBindingApi } from './apis'
import { Element } from './element.model'
import { PropMapBinding } from './prop-map-binding.model'

/**
 * We will have a single ElementService that contains all elements from
 *
 * - PageElementTree
 * - ComponentElementTree
 *
 */
@model('@codelab/ElementLinkService')
export class ElementLinkService
  extends Model({})
  implements IElementLinkService
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @modelFlow
  @transaction
  linkElement = _async(function* (
    this: ElementLinkService,
    {
      element,
      prevSiblingId,
      nextSiblingId,
      parentElementId,
    }: Parameters<IElementLinkService['linkElement']>[0],
  ) {
    // a -> [new] -> c
    if (parentElementId) {
      // parent = a -> [new] -> c
      // parent -> [new]
      yield* _await(
        this.elementService.patchElement(
          element,
          {
            parentElement: connectId(parentElementId),
          },
          false,
        ),
      )

      const parentElement = parentElementId
        ? this.elementService.element(parentElementId)
        : undefined

      if (!parentElement) {
        throw new Error("An element can only have one tree, and can't be link")
      }

      // parent -> c
      // parent -> [new] -> c
      // disconnect c as children root
      // connect new as children
      if (!prevSiblingId) {
        yield* _await(
          this.elementService.patchElement(
            parentElement,
            {
              childrenRoot: {
                ...disconnectId(parentElement.childrenRoot?.id),
                ...connectId(element?.id),
              },
            },
            false,
          ),
        )
      }
    }

    const prevSibling = prevSiblingId
      ? this.elementService.element(prevSiblingId)
      : undefined

    // a -> c
    // a -> [new] c
    // disconnect a,c
    // connect a to new
    if (prevSibling && prevSiblingId) {
      yield* _await(
        this.elementService.patchElement(
          prevSibling,
          {
            nextSibling: {
              ...disconnectId(prevSibling.nextSibling?.id),
              ...connectId(element?.id),
            },
          },
          false,
        ),
      )
    }

    const nextSibling = nextSiblingId
      ? this.elementService.element(nextSiblingId)
      : undefined

    // a -> c
    // a  [new] =>  c
    // disconnect a,c
    // connect [new] to c
    if (nextSiblingId && nextSibling) {
      yield* _await(
        this.elementService.patchElement(
          nextSibling,
          {
            prevSibling: {
              ...disconnectId(nextSibling.prevSibling?.id),
              ...connectId(element?.id),
            },
          },
          false,
        ),
      )
    }
  })

  @modelFlow
  @transaction
  unlinkElement = _async(function* (
    this: ElementLinkService,
    element: IElement,
    shouldUpdateCache?: boolean,
  ) {
    console.log('unlink element', {
      shouldUpdateCache,
      element: getSnapshot(element),
      next: element.nextSibling ? getSnapshot(element.nextSibling) : undefined,
      prev: element.prevSibling ? getSnapshot(element.prevSibling) : undefined,
      parentElement: element.parentElement
        ? getSnapshot(element.parentElement)
        : undefined,
    })

    // tree -> [removed] - x - y (no prev),
    if (!element.prevSibling && element.parentElement) {
      yield* _await(
        this.elementService.patchElement(
          element.parentElement,
          {
            childrenRoot: {
              // disconnect [removed]
              disconnect: {
                where: { node: { id: element.id } },
              },
              // set tree children root = x
              // tree -> x - y
              ...connectId(element.nextSibling?.id),
            },
          },
          shouldUpdateCache,
        ),
      )
    }

    //  x - [removed] - y
    if (element.nextSibling) {
      yield* _await(
        this.elementService.patchElement(
          element.nextSibling,
          {
            prevSibling: {
              // disconnect [removed]
              disconnect: {
                where: { node: { id: element.id } },
              },
              // link y -> x
              ...connectId(element.prevSibling?.id),
            },
          },
          shouldUpdateCache,
        ),
      )
    }

    // x - [removed] - y
    if (element.prevSibling) {
      yield* _await(
        this.elementService.patchElement(
          element.prevSibling,
          {
            nextSibling: {
              disconnect: {
                where: { node: { id: element.id } },
              },
              // link x to y
              ...connectId(element.nextSibling?.id),
            },
          },
          shouldUpdateCache,
        ),
      )
    }

    // debugger
    if (element.parentElement) {
      yield* _await(
        this.elementService.patchElement(
          element,
          {
            parentElement: {
              ...disconnectId(element.parentElement.id),
            },
          },
          shouldUpdateCache,
        ),
      )
    }
  })

  /**
   * Moves an element to the next postion of target element
   */
  @modelFlow
  @transaction
  moveElementNextTo = _async(function* (
    this: ElementLinkService,
    elementId: string,
    targetElementId: string,
  ) {
    const element = this.elementService.element(elementId)
    const targetElement = this.elementService.element(targetElementId)

    if (!element || !targetElement) {
      return
    }

    yield* _await(this.unlinkElement(element, false))
    yield* _await(
      this.linkElement({
        element,
        prevSiblingId: targetElement.id,
        nextSiblingId: targetElement?.nextSibling?.id,
        parentElementId: targetElement?.parentElement?.id,
      }),
    )

    // update element in cache
    //  update cache sequentially by api could introduce layout shift, and bug issue
    element.unlinkSiblings()
    element.linkSiblings({
      prevSiblingId: targetElement?.id,
      nextSiblingId: targetElement?.nextSibling?.id,
      parentElementId: targetElement?.parentElement?.id,
    })
    element.syncLinkedSiblings()
  })

  /**
   * Moves an element to the next position of children[0] of parent children element
   */
  @modelFlow
  @transaction
  moveAsRoot = _async(function* (
    this: ElementLinkService,
    elementId: string,
    parentElementId: string,
  ) {
    const element = this.elementService.element(elementId)
    const parentElement = this.elementService.element(parentElementId)

    if (!element || !parentElement) {
      return
    }

    yield* _await(this.unlinkElement(element, false))

    yield* _await(
      this.linkElement({
        element,
        // attach to beginning of the tree
        // [tree]-x
        // [tree]-[inserted]-x
        prevSiblingId: undefined,
        nextSiblingId: parentElement.childrenRoot?.id,
        parentElementId,
      }),
    )

    // update element in cache
    //  update cache sequentially by api could introduce layout shift, and bug issue
    element.unlinkSiblings()
    element.linkSiblings({
      prevSiblingId: undefined,
      nextSiblingId: parentElement.childrenRoot?.id,
      parentElementId: parentElementId,
    })
    element.syncLinkedSiblings()
  })

  @modelFlow
  @transaction
  deleteElementSubgraph = _async(function* (
    this: ElementLinkService,
    root: IElementRef,
  ) {
    const { elementGraph } = yield* _await(
      elementApi.GetElementGraph({ input: { rootId: root } }),
    )

    const idsToDelete = [elementGraph.id, ...elementGraph.descendants]
    const rootElement = this.elementService.element(root)

    if (rootElement) {
      yield* _await(this.unlinkElement(rootElement, true))
      // rootElement.unlinkSiblings()
    }

    for (const id of idsToDelete.reverse()) {
      this.elementService.elements.delete(id)
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
  createPropMapBinding = _async(function* (
    this: ElementLinkService,
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
    this: ElementLinkService,
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
    this: ElementLinkService,
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
