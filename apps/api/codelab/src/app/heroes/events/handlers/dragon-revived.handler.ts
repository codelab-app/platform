import { IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator'
import clc from 'cli-color'
import { DragonRevivedEvent } from '../impl/dragon-revived.event'

@EventsHandler(DragonRevivedEvent)
export class DragonRevivedHandler implements IEventHandler<DragonRevivedEvent> {
  handle(event: DragonRevivedEvent) {
    console.log(clc.greenBright('DragonRevivedEvent...'))
  }
}
