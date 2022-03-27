import { CypressCommand } from '../../types'
import { expectTooltip, getTooltip, shouldHaveTooltip } from './tooltip.command'

export interface AntTooltipCommands {
  getTooltip: typeof getTooltip
  expectTooltip: typeof expectTooltip
  shouldHaveTooltip: typeof shouldHaveTooltip
}

export const antTooltipCommands: Array<CypressCommand> = [
  {
    name: 'getTooltip',
    fn: getTooltip,
  },
  {
    name: 'expectTooltip',
    fn: expectTooltip,
  },
  {
    name: 'shouldHaveTooltip',
    fn: shouldHaveTooltip,
    options: {
      prevSubject: 'element',
    },
  },
]
