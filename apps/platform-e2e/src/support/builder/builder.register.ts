import type { CypressCommand } from '@codelab/frontend/test/cypress/command'
import {
  createElementAndStoreId,
  createElementTree,
  getNewElementId,
  openBuilder,
  openPreview,
  preventDefaultOnClick,
  removePreventDefaultOnClick,
} from './builder.command'

export interface CypressBuilderCommands {
  createElementAndStoreId: typeof createElementAndStoreId
  createElementTree: typeof createElementTree
  getNewElementId: typeof getNewElementId
  openBuilder: typeof openBuilder
  openPreview: typeof openPreview
  preventDefaultOnClick: typeof preventDefaultOnClick
  removePreventDefaultOnClick: typeof removePreventDefaultOnClick
}

export const builderCommands: Array<CypressCommand> = [
  {
    fn: createElementTree,
    name: 'createElementTree',
  },
  {
    fn: openPreview,
    name: 'openPreview',
  },
  {
    fn: openBuilder,
    name: 'openBuilder',
  },
  {
    fn: createElementAndStoreId,
    name: 'createElementAndStoreId',
  },
  {
    fn: getNewElementId,
    name: 'getNewElementId',
  },
  {
    fn: preventDefaultOnClick,
    name: 'preventDefaultOnClick',
  },
  {
    fn: removePreventDefaultOnClick,
    name: 'removePreventDefaultOnClick',
  },
]
