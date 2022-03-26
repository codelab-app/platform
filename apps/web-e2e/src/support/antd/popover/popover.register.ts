import type { CypressCommand } from '../../types'
import { getPopover, hidePopover, showPopover } from './popover.command'

export interface AntPopoverCommands {
  getPopover: typeof getPopover
  showPopover: typeof showPopover
  hidePopover: typeof hidePopover
}

export const antPopoverCommands: Array<CypressCommand> = [
  {
    name: 'getPopover',
    fn: getPopover,
  },
  {
    name: 'showPopover',
    fn: showPopover,
    options: {
      prevSubject: 'element' as any,
    },
  },
  {
    name: 'hidePopover',
    fn: hidePopover,
    options: {
      prevSubject: 'element' as any,
    },
  },
]
