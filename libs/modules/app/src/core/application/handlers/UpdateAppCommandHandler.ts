import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { AppDITokens } from '../../../framework/AppDITokens'
import { App } from '../../domain/app'
import { UpdateAppCommand } from '../commands/UpdateAppCommand'
import { UpdateAppUseCase } from '../useCases/updateApp/UpdateAppUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateAppCommand)
export class UpdateAppCommandHandler
  implements ICommandHandler<UpdateAppCommand> {
  constructor(
    @Inject(AppDITokens.UpdateAppUseCase)
    private readonly service: UpdateAppUseCase,
  ) {}

  public async execute({ request }: UpdateAppCommand): Promise<App> {
    const UpdateAppResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<App>) => results.value,
    )(UpdateAppResults)
  }
}
