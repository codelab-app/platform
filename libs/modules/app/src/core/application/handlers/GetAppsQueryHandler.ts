import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { AppDITokens } from '../../../framework/AppDITokens'
import { App } from '../../domain/app'
import { GetAppsQuery } from '../commands/GetAppsQuery'
import { GetAppsUseCase } from '../useCases/getApps/GetAppsUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(GetAppsQuery)
export class GetAppsQueryHandler implements IQueryHandler<GetAppsQuery> {
  constructor(
    @Inject(AppDITokens.GetAppsUseCase)
    private readonly service: GetAppsUseCase,
  ) {}

  public async execute({ request }: GetAppsQuery): Promise<Array<App>> {
    const GetAppsResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Array<App>>) => results.value,
    )(GetAppsResults)
  }
}
