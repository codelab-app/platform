import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UsersDITokens } from '../../../framework/UsersDITokens'
import { User } from '../../domain/user'
import { GetUsersQuery } from '../queries/GetUsersQuery'
import { GetUserService } from '../useCases/getUser/GetUserService'

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(UsersDITokens.GetUserUseCase)
    private readonly service: GetUserService,
  ) {}

  execute(query: GetUsersQuery): Promise<Array<User>> {
    return this.service.execute()
  }
}
