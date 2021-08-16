import { Tree } from '@codelab/shared/abstract/core'
import {
  ComponentFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'

export interface ElementTree<TData> extends Tree<TData> {
  /** Returns the component referenced by the specified element, or null if there isn't one */
  getComponentOfElement: (elementId: string) => ComponentFragment | undefined

  /** Returns the root element of a component */
  getComponentRootElement: (componentId: string) => ElementFragment | undefined

  /** Returns an element by its id or null if not found */
  getComponentById: (componentId: string) => ComponentFragment | undefined
}
