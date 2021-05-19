import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  GetUserGql,
  GetUsersQuery,
  GetUsersQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { GetUsersInput } from './get-users.input'

@Injectable()
export class GetUsersService
  implements UseCase<GetUsersInput | undefined, Array<User>>
{
  constructor(private apollo: ApolloClientService) {}

  async execute(request: GetUsersInput | undefined): Promise<Array<User>> {
    const result = await this.apollo
      .getClient()
      .query<GetUsersQuery, GetUsersQueryVariables>({
        query: GetUserGql,
        variables: {
          filter: {
            id: {
              in: request?.userIds,
            },
          },
        },
      })

    if (!result?.data?.users) {
      throw new Error('Error while getting user data')
    }

    return result.data.users as Array<User>
  }
}
