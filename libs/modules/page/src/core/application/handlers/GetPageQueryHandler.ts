import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { PageDITokens } from '../../../framework/PageDITokens'
import { Page } from '../../domain/page'
import { GetPageQuery } from '../queries/GetPageQuery'
import { GetPageUseCase } from '../useCases/getPage/GetPageUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(GetPageQuery)
export class GetPageQueryHandler implements IQueryHandler<GetPageQuery> {
  constructor(
    @Inject(PageDITokens.GetPageUseCase)
    private readonly service: GetPageUseCase,
  ) {}

  public async execute({ request }: GetPageQuery): Promise<Page> {
    const getPageResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Page>) => results.value,
    )(getPageResults)
  }
}
