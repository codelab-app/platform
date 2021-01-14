import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { PageDITokens } from '../../../framework/PageDITokens'
import { Page } from '../../domain/page'
import { GetPagesQuery } from '../queries/GetPagesQuery'
import { GetPagesUseCase } from '../useCases/getPages/GetPagesUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(GetPagesQuery)
export class GetPagesQueryHandler implements IQueryHandler<GetPagesQuery> {
  constructor(
    @Inject(PageDITokens.GetPagesUseCase)
    private readonly service: GetPagesUseCase,
  ) {}

  public async execute({ request }: GetPagesQuery): Promise<Page> {
    const GetPagesResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Page>) => results.value,
    )(GetPagesResults)
  }
}
