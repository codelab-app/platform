import { UseCase } from '@codelab/backend'
import { Auth0Service } from '@codelab/modules/auth-api'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DeleteUserRequest } from './delete-user.request'

@Injectable()
export class DeleteUserService implements UseCase<DeleteUserRequest, boolean> {
  constructor(private auth0: Auth0Service) {}

  async execute({ currentUser, input }: DeleteUserRequest): Promise<boolean> {
    if (currentUser?.sub !== input.userId) {
      throw new UnauthorizedException("Can't delete this user")
    }

    return await this.auth0
      .getManagementClient()
      .deleteUser({ id: input.userId })
      .then(() => true)
  }
}
