import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import {
  IElement,
  IElementDTO,
  IElementRef,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { elementApi } from './apis'
import { elementRef } from './element.ref'

const hydrate = async (elements: Array<IElementDTO>, rootId: string) => {
  const tree = new ElementTree({})
  // const elementModels = tree.elementService.hydrateOrUpdateCache(elements)
  // tree.buildTree(elementModels)

  return tree
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 */
@model('@codelab/ElementTree')
export class ElementTree
  extends Model({
    id: idProp,

    /** The root tree element */
    _root: prop<Nullable<Ref<IElement>>>(null).withSetter(),
  })
  implements IElementTree
{
  /**
   * All elements within the tree
   */
  @computed
  get elementsList() {
    return this._root
      ? [this._root.current, ...(this._root.current?.descendants ?? [])]
      : []
  }

  /**
   * Used to load the entire page tree
   */
  @modelFlow
  getTree = _async(function* (this: ElementTree, rootId: IElementRef) {
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

    const elementModels = this.elementService.hydrateOrUpdateCache(elements)

    this.buildTree(elementModels)

    return this
  })

  @computed
  get root() {
    return this._root?.current
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  element(id: string) {
    return this.elementsList?.find((element) => element.id === id)
  }

  @computed
  get componentService() {
    return getComponentService(this)
  }

  /**
   * Refactored to move hydration out of this function, keep this function as only creating references for tree shape
   */
  @modelAction
  buildTree(elements: Array<IElement>) {
    for (const element of elements) {
      if (!element.parentElement?.id) {
        this.set_root(elementRef(element))
      }

      if (element.instanceOfComponent?.current) {
        const componentId = element.instanceOfComponent?.current.id

        const componentRootElement =
          this.componentService.elementTrees.get(componentId)?.root

        if (componentRootElement) {
          element.addChild(componentRootElement)
        }
      }

      const parentId = element.parentElement?.id

      if (!parentId) {
        continue
      }

      // don't use this.element() since not all elements are registered yet
      const parent = this.elementService.element(parentId)

      if (!parent || parent.hasChild(element)) {
        continue
      }

      parent?.addChild(element)
    }
  }

  // @modelFlow
  // @transaction
  // moveElement = _async(function* (
  //   this: ElementService,
  //   targetElementId: IElementRef,
  //   { parentElementId, order }: MoveData,
  // ) {
  //   /*
  //    * It's important that we do this locally first, because we can do some validations
  //    * that would otherwise require a custom resolver to do
  //    */
  //   const targetElement = this.elementTree.moveElement(
  //     targetElementId,
  //     parentElementId,
  //     order,
  //   )
  //
  //   const input: ElementUpdateInput = {
  //     parentElement: {
  //       disconnect: { where: {} },
  //       connect: { edge: { order }, where: { node: { id: parentElementId } } },
  //     },
  //   }
  //
  //   return yield* _await(this.elementService(targetElement, input))
  // })

  getPathFromRoot(selectedElement: IElement): Array<IElement> {
    const path = []
    let current: IElement | undefined = selectedElement

    while (current) {
      path.push(current)
      current = current.parentElement
    }

    return path.reverse()
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static hydrate = hydrate
}

export const elementTreeRef = rootRef<ElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
