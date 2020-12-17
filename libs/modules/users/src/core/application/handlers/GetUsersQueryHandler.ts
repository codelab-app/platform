import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserDITokens } from '../../../framework/UserDITokens'
import { User } from '../../domain/user'
import { GetUsersQuery } from '../queries/GetUsersQuery'
import { GetUserService } from '../services/GetUserService'

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(UserDITokens.GetUserUseCase)
    private readonly service: GetUserService,
  ) {}

  execute(query: GetUsersQuery): Promise<Array<User>> {
    return this.service.execute()
  }
}
