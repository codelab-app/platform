import { PreferenceDomainService } from '@codelab/backend/domain/preference'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { UserRepository } from './user.repo.service'

@Injectable()
export class UserDomainService {
  constructor(
    private userRepository: UserRepository,
    private preferenceDomainService: PreferenceDomainService,
    private authDomainService: AuthDomainService,
  ) {}

  async saveUser(userDto: IUserDto) {
    const user = await this.userRepository.save(userDto, {
      auth0Id: userDto.auth0Id,
    })

    await this.preferenceDomainService.createInitialPreference({
      owner: user,
    })

    return user
  }

  async seedUser(userDto: IUserDto) {
    const user = await this.userRepository.add(userDto)

    await this.preferenceDomainService.createInitialPreference({ owner: user })

    return user
  }

  /**
   * Seed a user from currently authenticated user, takes user from request object
   */
  async seedUserFromRequest() {
    const currentUser = this.authDomainService.currentUser

    return this.saveUser(currentUser)
  }
}
