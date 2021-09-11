import { UseCasePort } from '@codelab/backend/abstract/core'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DeleteUserRequest } from './delete-user.request'

@Injectable()
export class DeleteUserService
  implements UseCasePort<DeleteUserRequest, boolean>
{
  async execute({ currentUser, input }: DeleteUserRequest): Promise<boolean> {
    if (currentUser.id !== input.id) {
      throw new UnauthorizedException("Can't delete this user")
    }

    return false
  }
}
