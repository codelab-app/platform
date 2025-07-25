import type { Ref } from 'mobx-keystone'

import { computed } from 'mobx'
import {
  idProp,
  Model,
  model,
  modelAction,
  prop,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone'

import type { IElementTree } from '../element-tree.interface.model'
import type { IElementModel } from '../element.model.interface'

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
    rootElement: prop<Ref<IElementModel>>().withSetter(),
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

  /**
   * Get all descendant elements of current subRoot
   */
  @modelAction
  descendants(subRoot: Ref<IElementModel>) {
    const descendants: Array<IElementModel> = []

    walkTree(
      subRoot,
      (node) => {
        descendants.push(node as IElementModel)
      },
      // Walks from root to children
      WalkTreeMode.ParentFirst,
    )

    return descendants
  }

  element(id: string) {
    return this.elements.find((element) => element.id === id)
  }
}
