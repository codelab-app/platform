import { UseCasePort } from '@codelab/backend/abstract/core'
import { Auth0Service } from '@codelab/backend/infra'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../../domain/user.model'
import { UpdateUserRequest } from './update-user.request'

@Injectable()
export class UpdateUserService implements UseCasePort<UpdateUserRequest, User> {
  constructor(private auth0: Auth0Service) {}

  async execute({ currentUser, input }: UpdateUserRequest): Promise<User> {
    if (currentUser?.id !== input.userId) {
      throw new UnauthorizedException("You can't edit this user")
    }

    return await this.auth0.getManagementClient().updateUser(
      { id: input.userId },
      {
        ...input.updateData,
      },
    )
  }
}
