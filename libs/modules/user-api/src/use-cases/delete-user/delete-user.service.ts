import { Auth0Service, UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { DeleteUserInput } from './delete-user.input'

@Injectable()
export class DeleteUserService implements UseCase<DeleteUserInput, boolean> {
  constructor(private auth0: Auth0Service) {}

  async execute(request: DeleteUserInput): Promise<boolean> {
    return await this.auth0
      .getManagementClient()
      .deleteUser({ id: request.userId })
      .then(() => true)
  }
}
