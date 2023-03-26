import { computed } from 'mobx'
import {
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone'
import type { IPageNodeRef } from '../../page'
import { isElementPageNodeRef } from '../../page'
import type { IElement } from '../element.model.interface'
import { getElementService } from '../element.service.context'
import type { IElementTree } from '../element-tree.interface.model'

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
    rootElement: prop<Ref<IElement>>().withSetter(),
  })
  implements IElementTree
{
  /**
   * All elements within the tree
   */
  @computed
  get elements() {
    return [
      this.rootElement.current,
      ...this.rootElement.current.descendantElements,
    ]
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  element(id: string) {
    return this.elements.find((element) => element.id === id)
  }

  /**
   * Get all descendant elements of current subRoot
   */
  @modelAction
  descendants(subRoot: Ref<IElement>) {
    const descendants: Array<IElement> = []

    walkTree(
      subRoot,
      (node) => {
        descendants.push(node as IElement)
      },
      // Walks from root to children
      WalkTreeMode.ParentFirst,
    )

    return descendants
  }

  getPathFromRoot(selectedElement: IPageNodeRef): Array<string> {
    const path = []

    if (!isElementPageNodeRef(selectedElement)) {
      return [selectedElement.current.id]
    }

    let currentElement = selectedElement.maybeCurrent

    while (currentElement) {
      path.push(currentElement.id)
      currentElement = currentElement.parent?.current
    }

    return path.reverse()
  }
}
