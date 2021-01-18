import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Page } from '../../domain/page'
import { CreatePageSuccessCommand } from '../commands/CreatePageSuccessCommand'

@CommandHandler(CreatePageSuccessCommand)
export class CreatePageSuccessCommandHandler
  implements ICommandHandler<CreatePageSuccessCommand> {
  logger: Logger = new Logger('CreatePageSuccessCommandHandler')

  // constructor(
  //     @Inject(ProvidersConstants.EVENT_STORE_PROVIDER)
  //             public readonly eventStoreBroker: EventStoreBroker
  // ) {
  // }

  public async execute(): Promise<Page> {
    // const client: EventStoreNodeConnection = this.eventStoreBroker.getClient()
    // try {
    //   const res: StreamEventsSlice = await client.readStreamEventsBackward('$svc-app', -1, 2)
    //   const readEvent = await client.readEvent('$svc-app', 189)
    //   const a = ''
    // } catch (e) {
    //   this.logger.error(e)
    // }

    return Promise.reject()
  }
}
