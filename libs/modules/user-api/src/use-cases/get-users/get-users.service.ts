import { Auth0Service, UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { GetUsersInput } from './get-users.input'

@Injectable()
export class GetUsersService
  implements UseCase<GetUsersInput | undefined, Array<User>>
{
  constructor(private auth0: Auth0Service) {}

  async execute(request: GetUsersInput | undefined): Promise<Array<User>> {
    //https://auth0.com/docs/api/management/v2#!/Users/get_users
    return await this.auth0.getManagementClient().getUsers({
      page: request?.page,
      per_page: request?.perPage,
      sort: request?.sort,
      q: request?.query,
    })
  }
}
