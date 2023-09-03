import type { CypressCommand } from '../types'
import { createElementTree, openBuilder, openPreview } from './builder.command'

export interface CypressBuilderCommands {
  createElementTree: typeof createElementTree
  openBuilder: typeof openBuilder
  openPreview: typeof openPreview
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
]
