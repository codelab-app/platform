import type { CypressCommand } from '../../types'
import { getPopover, hidePopover, showPopover } from './popover.command'

export interface AntPopoverCommands {
  getPopover: typeof getPopover
  hidePopover: typeof hidePopover
  showPopover: typeof showPopover
}

export const antPopoverCommands: Array<CypressCommand> = [
  {
    fn: getPopover,
    name: 'getPopover',
  },
  {
    fn: showPopover,
    name: 'showPopover',
    options: {
      prevSubject: 'element' as any,
    },
  },
  {
    fn: hidePopover,
    name: 'hidePopover',
    options: {
      prevSubject: 'element' as any,
    },
  },
]
