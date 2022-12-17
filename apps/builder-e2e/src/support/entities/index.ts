import type { CypressCommand } from '../types'
import { createTagByUI, deleteTagInTableByUI } from './tag/tag.command'

export interface CypressUICommands {
  createTagByUI: typeof createTagByUI
  deleteTagInTableByUI: typeof deleteTagInTableByUI
}

export const UICommands: Array<CypressCommand> = [
  {
    name: 'createTagByUI',
    fn: createTagByUI,
  },
  {
    name: 'deleteTagInTableByUI',
    fn: deleteTagInTableByUI,
  },
]
