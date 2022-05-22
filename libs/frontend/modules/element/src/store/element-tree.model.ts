import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { IElement, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { elementRef } from './element.ref'

/**
 * Helper method to initialize an element tree
 *
 * @param elements
 * @param elementService required as param since during constructor function, this isn't attached to the root yet
 */
const init = (elements: Array<IElement> = []) => {
  return new ElementTree({
    _elements: elements.map((element) => elementRef(element)),
  })
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 *
 * ElementTree is just a required data structure for RenderService to work. The end goal is to render elements on a page, so we move this under RenderService
 */
@model('@codelab/ElementTree')
export class ElementTree
  extends Model({
    id: idProp,
    _elements: prop<Array<Ref<IElement>>>(() => []),
    /** The root tree element */
    _root: prop<Nullable<Ref<IElement>>>(null).withSetter(),
  })
  implements IElementTree
{
  protected onAttachedToRootStore(rootStore: object) {
    console.log('onAttachedToRootStore')

    this.buildTree(this._elements.map((element) => element.current))
  }

  /**
   * All elements within the tree
   */
  @computed
  get elementsList() {
    return this._root
      ? [this._root.current, ...(this._root.current?.descendants ?? [])]
      : []
  }

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
        const component = this.componentService.components.get(componentId)

        if (!component) {
          throw new Error('Missing component')
        }

        const componentRootElementId = component?.rootElementId

        const componentRootElement = this.elementService.elements.get(
          componentRootElementId,
        )

        if (componentRootElement) {
          element.addChild(
            componentRootElement.id,
            elementRef(componentRootElement),
          )
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

      parent?.addChild(element.id, elementRef(element))
    }

    return this
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
  public static init = init
}

export const elementTreeRef = rootRef<IElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
