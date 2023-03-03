import type { CypressCommand } from '../../types'
import { expectTooltip, getTooltip, shouldHaveTooltip } from './tooltip.command'

export interface AntTooltipCommands {
  getTooltip: typeof getTooltip
  expectTooltip: typeof expectTooltip
  shouldHaveTooltip: typeof shouldHaveTooltip
}

export const antTooltipCommands: Array<CypressCommand> = [
  {
    fn: getTooltip,
    name: 'getTooltip',
  },
  {
    fn: expectTooltip,
    name: 'expectTooltip',
  },
  {
    fn: shouldHaveTooltip,
    name: 'shouldHaveTooltip',
    options: {
      prevSubject: 'element',
    },
  },
]
