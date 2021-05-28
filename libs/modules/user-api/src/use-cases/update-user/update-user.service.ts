import { Auth0Service, UseCase } from '@codelab/backend'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../../user.model'
import { UpdateUserRequest } from './update-user.request'

@Injectable()
export class UpdateUserService implements UseCase<UpdateUserRequest, User> {
  constructor(private auth0: Auth0Service) {}

  async execute({ currentUser, input }: UpdateUserRequest): Promise<User> {
    if (currentUser?.sub !== input.userId) {
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
