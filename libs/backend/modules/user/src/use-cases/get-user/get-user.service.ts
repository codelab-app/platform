import { UseCasePort } from '@codelab/backend/abstract/core'
import { Auth0Service } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { User } from '../../user.model'
import { GetUserRequest } from './get-user.request'

@Injectable()
export class GetUserService implements UseCasePort<GetUserRequest, User> {
  constructor(private auth0: Auth0Service) {}

  async execute(request: GetUserRequest): Promise<User> {
    return await this.auth0
      .getManagementClient()
      .getUser({ id: request.userId })
  }
}
