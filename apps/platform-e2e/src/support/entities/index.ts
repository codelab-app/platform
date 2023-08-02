import type { CypressCommand } from '@codelab/testing/cypress/command'
import { createTagByUI, deleteTagInTableByUI } from './tag/tag.command'

export interface CypressUICommands {
  createTagByUI: typeof createTagByUI
  deleteTagInTableByUI: typeof deleteTagInTableByUI
}

export const UICommands: Array<CypressCommand> = [
  {
    fn: createTagByUI,
    name: 'createTagByUI',
  },
  {
    fn: deleteTagInTableByUI,
    name: 'deleteTagInTableByUI',
  },
]
