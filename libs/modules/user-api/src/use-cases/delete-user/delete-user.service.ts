import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  DeleteUserGql,
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { DeleteUserInput } from './delete-user.input'

@Injectable()
export class DeleteUserService implements UseCase<DeleteUserInput, User> {
  constructor(private apollo: ApolloClientService) {}

  async execute(request: DeleteUserInput): Promise<User> {
    const result = await this.apollo
      .getClient()
      .mutate<DeleteUserMutation, DeleteUserMutationVariables>({
        mutation: DeleteUserGql,
        variables: {
          filter: {
            id: {
              eq: request.id,
            },
          },
        },
      })

    if (!result?.data?.deleteUser?.numUids || !result?.data?.deleteUser?.user) {
      throw new Error('Error while deleting user')
    }

    return result.data.deleteUser.user[0] as User
  }
}
