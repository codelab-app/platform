import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { expectTooltip, getTooltip, shouldHaveTooltip } from './tooltip.command'

export interface AntTooltipCommands {
  expectTooltip: typeof expectTooltip
  getTooltip: typeof getTooltip
  shouldHaveTooltip: typeof shouldHaveTooltip
}

export const antTooltipCommands: Array<CypressCommand> = [
  {
    fn: getTooltip,
  },
  {
    fn: expectTooltip,
  },
  {
    fn: shouldHaveTooltip,
    options: {
      prevSubject: 'element',
    },
  },
]
