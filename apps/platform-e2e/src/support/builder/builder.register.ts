import type { CypressCommand } from '../types'
import {
  createElementTree,
  getNewElementId,
  openBuilder,
  openPreview,
  preventDefaultOnClick,
  removePreventDefaultOnClick,
  storeNewElementId,
} from './builder.command'

export interface CypressBuilderCommands {
  createElementTree: typeof createElementTree
  getNewElementId: typeof getNewElementId
  openBuilder: typeof openBuilder
  openPreview: typeof openPreview
  preventDefaultOnClick: typeof preventDefaultOnClick
  removePreventDefaultOnClick: typeof removePreventDefaultOnClick
  storeNewElementId: typeof storeNewElementId
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
    fn: storeNewElementId,
    name: 'storeNewElementId',
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
