import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Observable, combineLatest } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command'
import { DragonRevivedEvent } from '../events/impl/dragon-revived.event'
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event'

const itemId = '0'

@Injectable()
export class HeroesGameSagas {
  // Killed + Revived
  @Saga()
  dragonRevived = (events$: Observable<any>): Observable<ICommand> => {
    return combineLatest([
      events$.pipe(
        ofType(HeroKilledDragonEvent),
        delay(1000),
        map((event) => {
          console.log(
            clc.redBright(
              'Inside [HeroesGameSagas] Saga - HeroKilledDragonEvent',
            ),
          )

          return event
        }),
      ),
      events$.pipe(
        ofType(DragonRevivedEvent),
        delay(2000),
        map((event) => {
          console.log(
            clc.redBright('Inside [HeroesGameSagas] Saga - DragonRevivedEvent'),
          )

          return event
        }),
      ),
    ]).pipe(
      /**
       * Here is when both streams complete, comment out `hero.reviveEnemy()` inside `kill-dragon.handler.ts` and stream won't complete.
       */
      map(([dragonKilledEvent$, dragonRevivedEvent$]) => {
        console.log(dragonKilledEvent$, dragonRevivedEvent$)

        return new DropAncientItemCommand(dragonKilledEvent$.heroId, itemId)
      }),
    )
  }
}
