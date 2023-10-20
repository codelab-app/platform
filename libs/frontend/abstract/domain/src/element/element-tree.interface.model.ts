import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IPageNodeRef } from '../page'
import type { IElementModel } from './element.model.interface'

/**
 * Uses ref's only for the implementation
 *
 * Possibly could use computed tree to drive the elementTree from an original tree
 *
 * This is either a `Page` or a `Component`
 *
 * https://mobx-keystone.js.org/computed-trees
 */
export interface IElementTree {
  elements: Array<IElementModel>
  id: string
  rootElement: Ref<IElementModel>

  descendants(subRoot: Ref<IElementModel>): Array<IElementModel>
  element(id: string): Maybe<IElementModel>
  getPathFromRoot(pageNode: IPageNodeRef): Array<string>
  setRootElement(elementRef: Ref<IElementModel>): void
}
