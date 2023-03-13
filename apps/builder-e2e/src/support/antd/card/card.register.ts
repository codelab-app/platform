import type { CypressCommand } from '../../types'
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
    name: 'getCard',
  },
  {
    fn: getCardTitle,
    name: 'getCardTitle',
  },
  {
    fn: getCardContent,
    name: 'getCardContent',
  },
  {
    fn: getCardContent,
    name: 'getCardActions',
  },
]
