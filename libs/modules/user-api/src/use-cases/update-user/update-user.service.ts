import { Auth0Service, UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { UpdateUserInput } from './update-user.input'

@Injectable()
export class UpdateUserService implements UseCase<UpdateUserInput, User> {
  constructor(private auth0: Auth0Service) {}

  async execute(request: UpdateUserInput): Promise<User> {
    return await this.auth0.getManagementClient().updateUser(
      { id: request.userId },
      {
        ...request.updateData,
      },
    )
  }
}
