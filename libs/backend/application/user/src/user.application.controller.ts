import { CurrentUser } from '@codelab/backend/application/auth'
import { UserRepository } from '@codelab/backend/domain/user'
import { IUserDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserApplicationController {
  constructor(private userRepository: UserRepository) {}

  @Get('preferences')
  async getPreferences(@CurrentUser() userDto: IUserDto) {
    const user = await this.userRepository.findOne({
      selectionSet: '{preferences}',
      where: { auth0Id: userDto.auth0Id },
    })

    return user.preferences ?? '{}'
  }

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@CurrentUser() userDto: IUserDto) {
    const user = await this.userRepository.save(userDto, {
      auth0Id: userDto.auth0Id,
    })

    return user
  }

  @Post('preferences')
  savePreferences(
    @Body() body: Record<string, string>,
    @CurrentUser() userDto: IUserDto,
  ) {
    return this.userRepository.save(
      { ...userDto, preferences: body['preferences'] },
      { auth0Id: userDto.auth0Id },
    )
  }
}
