import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { domainApi } from './graphql'

@Injectable()
export class DomainService {
  @OnEvent('server.ready')
  subscribeToServer() {
    console.log('subscribe')
    // void domainApi
    //   .domainCreated()
    //   .then((subscription) => {
    //     console.log(subscription.domainCreated)
    //   })
    //   .catch((error) => {
    //     console.error('Failed to subscribe to domain creation events:', error)
    //   })
  }
}
