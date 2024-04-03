import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
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
  },
  {
    fn: openPreview,
  },
  {
    fn: openBuilder,
  },
  {
    fn: createElementAndStoreId,
  },
  {
    fn: getNewElementId,
  },
  {
    fn: preventDefaultOnClick,
  },
  {
    fn: removePreventDefaultOnClick,
  },
]
