import { UseCasePort } from '@codelab/backend/abstract/core'
import { Auth0Service } from '@codelab/backend/infra'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DeleteUserRequest } from './delete-user.request'

@Injectable()
export class DeleteUserService
  implements UseCasePort<DeleteUserRequest, boolean>
{
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
