import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  DeleteUserGql,
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { DeleteUsersInput } from './delete-users.input'
import { DeleteUsersResponse } from './delete-users-response'

@Injectable()
export class DeleteUsersService
  implements UseCase<DeleteUsersInput, DeleteUsersResponse>
{
  constructor(private apollo: ApolloClientService) {}

  async execute(request: DeleteUsersInput): Promise<DeleteUsersResponse> {
    const result = await this.apollo
      .getClient()
      .mutate<DeleteUserMutation, DeleteUserMutationVariables>({
        mutation: DeleteUserGql,
        variables: {
          filter: {
            or: request.ids.map((id) => ({ id: { eq: id } })),
          },
        },
      })

    if (!result?.data?.deleteUser?.numUids || !result?.data?.deleteUser?.user) {
      throw new Error('Error while deleting user')
    }

    return {
      numberAffected: result.data.deleteUser.numUids,
    }
  }
}
