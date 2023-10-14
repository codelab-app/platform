import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import { createTagByUI, deleteTagInTableByUI } from './tag.command'

export interface CypressTagCommands {
  createTagByUI: typeof createTagByUI
  deleteTagInTableByUI: typeof deleteTagInTableByUI
}

export const tagCommands: Array<CypressCommand> = [
  {
    fn: createTagByUI,
    name: 'createTagByUI',
  },
  {
    fn: deleteTagInTableByUI,
    name: 'deleteTagInTableByUI',
  },
]