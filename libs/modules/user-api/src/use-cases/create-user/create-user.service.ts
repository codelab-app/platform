import { ApolloClientService, UseCase } from '@codelab/backend'
import {
  CreateUserGql,
  CreateUserMutation,
  CreateUserMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { User } from '../../user.model'
import { CreateUserRequest } from './create-user.request'

@Injectable()
export class CreateUserService implements UseCase<CreateUserRequest, User> {
  constructor(private apollo: ApolloClientService) {}

  async execute({ input, upsert }: CreateUserRequest): Promise<User> {
    const result = await this.apollo
      .getClient()
      .mutate<CreateUserMutation, CreateUserMutationVariables>({
        mutation: CreateUserGql,
        variables: {
          input: {
            id: input.id || uuid(), //Allow us to pass a custom id if we need it - e.g. when calling from Auth0. If not - assign a random UUID
            email: input.email,
            name: input.name,
          },
          upsert,
        },
      })

    if (!result?.data?.addUser?.user || !result.data.addUser.user.length) {
      throw new Error('Error while creating user')
    }

    return result.data.addUser.user[0] as User
  }
}
