import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { createTagByUI, deleteTagInTableByUI } from './tag.command'

export interface CypressTagCommands {
  createTagByUI: typeof createTagByUI
  deleteTagInTableByUI: typeof deleteTagInTableByUI
}

export const tagCommands: Array<CypressCommand> = [
  {
    fn: createTagByUI,
  },
  {
    fn: deleteTagInTableByUI,
  },
]
