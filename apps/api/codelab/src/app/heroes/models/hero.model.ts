import { AggregateRoot } from '@nestjs/cqrs'
import { DragonRevivedEvent } from '../events/impl/dragon-revived.event'
import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event'
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event'

export class Hero extends AggregateRoot {
  constructor(private readonly id: string) {
    super()
  }

  killEnemy(enemyId: string) {
    this.apply(new HeroKilledDragonEvent(this.id, enemyId))
  }

  reviveEnemy() {
    this.apply(new DragonRevivedEvent())
  }

  addItem(itemId: string) {
    this.apply(new HeroFoundItemEvent(this.id, itemId))
  }
}
