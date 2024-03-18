import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { getCardActions } from './card.command'
import { getCard, getCardContent, getCardTitle } from './card.command'

export interface AntCardCommands {
  getCard: typeof getCard
  getCardActions: typeof getCardActions
  getCardContent: typeof getCardContent
  getCardTitle: typeof getCardTitle
}

export const antCardCommands: Array<CypressCommand> = [
  {
    fn: getCard,
  },
  {
    fn: getCardTitle,
  },
  {
    fn: getCardContent,
  },
  {
    fn: getCardContent,
  },
]
