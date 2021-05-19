import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  GetUserGql,
  GetUserQuery,
  GetUserQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { GetMeRequest } from './get-me.request'

@Injectable()
export class GetMeService implements UseCase<GetMeRequest, User> {
  constructor(private apollo: ApolloClientService) {}

  async execute(request: GetMeRequest): Promise<User> {
    const result = await this.apollo
      .getClient()
      .query<GetUserQuery, GetUserQueryVariables>({
        query: GetUserGql,
        variables: {
          id: request.userId,
        },
      })

    if (!result?.data?.user) {
      throw new Error('Error while getting user data')
    }

    return result.data.user as User
  }
}
