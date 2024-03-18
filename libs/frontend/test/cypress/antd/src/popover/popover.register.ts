import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { getPopover, hidePopover, showPopover } from './popover.command'

export interface AntPopoverCommands {
  getPopover: typeof getPopover
  hidePopover: typeof hidePopover
  showPopover: typeof showPopover
}

export const antPopoverCommands: Array<CypressCommand> = [
  {
    fn: getPopover,
  },
  {
    fn: showPopover,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: hidePopover,
    options: {
      prevSubject: 'element',
    },
  },
]
