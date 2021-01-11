import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { AppDITokens } from '../../../framework/AppDITokens'
import { App } from '../../domain/app'
import { DeleteAppCommand } from '../commands/DeleteAppCommand'
import { DeleteAppUseCase } from '../useCases/deleteApp/DeleteAppUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(DeleteAppCommand)
export class DeleteAppCommandHandler
  implements ICommandHandler<DeleteAppCommand> {
  constructor(
    @Inject(AppDITokens.DeleteAppUseCase)
    private readonly service: DeleteAppUseCase,
  ) {}

  public async execute({ request }: DeleteAppCommand): Promise<App> {
    const DeleteAppResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<App>) => results.value,
    )(DeleteAppResults)
  }
}
