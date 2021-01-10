import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { UserDITokens } from '../../../framework/UserDITokens'
import { User } from '../../domain/user'
import { GetMeQuery } from '../commands/GetMeQuery'
import { GetMeUseCase } from '../useCases/getMe/GetMeUseCase'
import { Result, UUID } from '@codelab/backend'

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject(UserDITokens.GetMeUseCase)
    private readonly service: GetMeUseCase,
  ) {}

  public async execute({ request }: GetMeQuery): Promise<User<UUID>> {
    const getMeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User<UUID>>) => results.value,
    )(getMeResults)
  }
}
