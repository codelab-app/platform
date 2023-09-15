import { CurrentUser } from '@codelab/backend/application/shared'
import { UserRepository } from '@codelab/backend/domain/user'
import { AUTH0_MANAGEMENT_CLIENT_TOKEN } from '@codelab/backend/infra/adapter/auth0'
import { IUserDTO } from '@codelab/shared/abstract/core'
import { Controller, Inject, Post } from '@nestjs/common'
import { ManagementClient } from 'auth0'

@Controller('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    @Inject(AUTH0_MANAGEMENT_CLIENT_TOKEN) private client: ManagementClient,
  ) {}

  @Post('save')
  async save(@CurrentUser() userDto: IUserDTO) {
    const { auth0Id } = userDto

    const user = await this.userRepository.save(userDto, {
      auth0Id,
    })

    await this.client.updateUser(
      { id: auth0Id },
      {
        app_metadata: {
          user_id: user.id,
        },
      },
    )

    return user
  }
}
