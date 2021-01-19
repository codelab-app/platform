import { Inject, Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PubSub } from 'graphql-subscriptions'
import { PageDITokens } from '../../../framework/PageDITokens'
import { CreatePageSuccessCommand } from '../commands/CreatePageSuccessCommand'

@CommandHandler(CreatePageSuccessCommand)
export class CreatePageSuccessCommandHandler
  implements ICommandHandler<CreatePageSuccessCommand> {
  logger: Logger = new Logger('CreatePageSuccessCommandHandler')

  constructor(
    @Inject(PageDITokens.GraphQLPubSub)
    public readonly pubSub: PubSub,
  ) {}

  public async execute({ page }: CreatePageSuccessCommand): Promise<void> {
    await this.pubSub.publish('pageCreated', { pageCreated: page })
  }
}
