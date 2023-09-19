import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import { expectTooltip, getTooltip, shouldHaveTooltip } from './tooltip.command'

export interface AntTooltipCommands {
  expectTooltip: typeof expectTooltip
  getTooltip: typeof getTooltip
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