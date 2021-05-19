import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  CreateUserGql,
  CreateUserMutation,
  CreateUserMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { CreateUserInput } from './create-user.input'

@Injectable()
export class CreateUserService implements UseCase<CreateUserInput, User> {
  constructor(private apollo: ApolloClientService) {}

  async execute(request: CreateUserInput): Promise<User> {
    const result = await this.apollo
      .getClient()
      .mutate<CreateUserMutation, CreateUserMutationVariables>({
        mutation: CreateUserGql,
        variables: {
          input: {
            email: request.email,
            name: request.name,
          },
        },
      })

    if (!result?.data?.addUser?.user || !result.data.addUser.user.length) {
      throw new Error('Error while creating user')
    }

    return result.data.addUser.user[0] as User
  }
}
