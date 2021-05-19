import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  UpdateUserGql,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { UpdateUserInput } from './update-user.input'

@Injectable()
export class UpdateUserService implements UseCase<UpdateUserInput, User> {
  constructor(private apollo: ApolloClientService) {}

  async execute(request: UpdateUserInput): Promise<User> {
    const result = await this.apollo
      .getClient()
      .mutate<UpdateUserMutation, UpdateUserMutationVariables>({
        mutation: UpdateUserGql,
        variables: {
          input: {
            filter: {
              id: [request.id],
            },
            set: {
              name: request.name,
            },
          },
        },
      })

    if (
      !result?.data?.updateUser?.user ||
      !result.data.updateUser.user.length
    ) {
      throw new Error('Error while updating user')
    }

    return result.data.updateUser.user[0] as User
  }
}
