import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { UsersDITokens } from '../../../framework/UsersDITokens'
import { User } from '../../domain/user'
import { GetMeQuery } from '../commands/GetMeQuery'
import { GetMeUseCase } from '../useCases/getMe/GetMeUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject(UsersDITokens.GetMeUseCase)
    private readonly service: GetMeUseCase,
  ) {}

  public async execute({ request }: GetMeQuery): Promise<User> {
    const GetMeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => results.value,
    )(GetMeResults)
  }
}
