import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { AppDITokens } from '../../../framework/AppDITokens'
import { App } from '../../domain/app'
import { CreateAppCommand } from '../commands/CreateAppCommand'
import { CreateAppUseCase } from '../useCases/createApp/CreateAppUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreateAppCommand)
export class CreateAppCommandHandler
  implements ICommandHandler<CreateAppCommand> {
  constructor(
    @Inject(AppDITokens.CreateAppUseCase)
    private readonly service: CreateAppUseCase,
  ) {}

  public async execute({ request }: CreateAppCommand): Promise<App> {
    const CreateAppResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<App>) => results.value,
    )(CreateAppResults)
  }
}
