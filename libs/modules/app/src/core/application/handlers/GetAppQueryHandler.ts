import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Option } from 'fp-ts/Option'
import { AppDITokens } from '../../../framework/AppDITokens'
import { App } from '../../domain/app'
import { GetAppQuery } from '../queries/GetAppQuery'
import { GetAppService } from '../useCases/getApp/GetAppService'

@QueryHandler(GetAppQuery)
export class GetAppQueryHandler implements IQueryHandler<GetAppQuery> {
  constructor(
    @Inject(AppDITokens.GetAppService) public readonly service: GetAppService,
  ) {}

  async execute({ request }: GetAppQuery): Promise<Option<App>> {
    return this.service.execute(request)
  }
}
