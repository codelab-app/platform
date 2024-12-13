import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class GraphqlService {
  constructor(private eventEmitter: EventEmitter2) {}

  serverReadyHook() {
    this.eventEmitter.emit('server.ready')
  }
}
