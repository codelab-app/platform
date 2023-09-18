import { CurrentUser } from '@codelab/backend/application/shared'
import { UserRepository } from '@codelab/backend/domain/user'
import { AUTH0_MANAGEMENT_CLIENT_TOKEN } from '@codelab/backend/infra/adapter/auth0'
import {
  type Auth0IdToken,
  IRole,
  IUserDTO,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ManagementClient } from 'auth0'
import { v4 } from 'uuid'

@Controller('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    @Inject(AUTH0_MANAGEMENT_CLIENT_TOKEN) private client: ManagementClient,
  ) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@Body() auth0IdToken: Auth0IdToken) {
    console.log({ auth0IdToken })

    const { email, nickname: username, sub: auth0Id } = auth0IdToken
    const neo4jId = auth0IdToken[JWT_CLAIMS].neo4j_user_id
    const id = auth0IdToken[JWT_CLAIMS].neo4j_user_id
    const roles = auth0IdToken[JWT_CLAIMS].roles

    /**
     * Means we haven't updated app_metadata yet
     */
    const user = await this.userRepository.save(
      {
        auth0Id,
        email,
        id,
        roles: roles.map((role) => IRole[role]),
        username,
      },
      {
        auth0Id,
      },
    )

    console.log(user)

    /**
     * If `neo4j_user_id` already exists in `app_metadata` in Auth0, we don't need to update it
     */
    // try {
    //   await this.client.updateAppMetadata(
    //     { id: auth0Id },
    //     {
    //       neo4j_user_id: user.id,
    //     },
    //   )
    // } catch (error) {
    //   console.error(error)
    // }

    return user
  }
}
