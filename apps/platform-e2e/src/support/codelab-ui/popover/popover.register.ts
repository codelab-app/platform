import type { CypressCommand } from '../../types'
import { getCuiPopover } from './popover.command'

export interface CodelabUIPopoverCommands {
  getCuiPopover: typeof getCuiPopover
}

export const codelabUIPopoverCommands: Array<CypressCommand> = [
  {
    fn: getCuiPopover,
    name: 'getCuiPopover',
  },
]
