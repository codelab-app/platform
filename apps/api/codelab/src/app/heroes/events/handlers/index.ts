import { DragonRevivedEvent } from '../impl/dragon-revived.event'
import { HeroFoundItemHandler } from './hero-found-item.handler'
import { HeroKilledDragonHandler } from './hero-killed-dragon.handler'

export const EventHandlers = [
  HeroKilledDragonHandler,
  HeroFoundItemHandler,
  DragonRevivedEvent,
]
