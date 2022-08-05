import { CypressCommand } from '../../types'
import {
  getCard,
  getCardActions,
  getCardContent,
  getCardTitle,
} from './card.command'

export interface AntCardCommands {
  getCard: typeof getCard
  getCardTitle: typeof getCardTitle
  getCardContent: typeof getCardContent
  getCardActions: typeof getCardActions
}

export const antCardCommands: Array<CypressCommand> = [
  {
    name: 'getCard',
    fn: getCard,
  },
  {
    name: 'getCardTitle',
    fn: getCardTitle,
  },
  {
    name: 'getCardContent',
    fn: getCardContent,
  },
  {
    name: 'getCardActions',
    fn: getCardContent,
  },
]
