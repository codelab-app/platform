import type { IOwner, IUserDto } from '@codelab/shared/abstract/core'

import { PreferenceRepository } from '@codelab/backend/domain/preference'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  breakpoints,
  DEFAULT_BUILDER_BREAKPOINT,
} from '@codelab/shared/config/builder'
import { preferenceDefault } from '@codelab/shared-domain-module/preference'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

import { UserRepository } from './user.repo.service'

@Injectable()
export class UserDomainService {
  constructor(
    private userRepository: UserRepository,
    private authDomainService: AuthDomainService,
    private preferenceRepository: PreferenceRepository,
  ) {}

  async saveUser(userDto: IUserDto) {
    const user = await this.userRepository.save(userDto, {
      auth0Id: userDto.auth0Id,
    })

    return user
  }

  async seedUser(userDto: IUserDto) {
    const user = await this.userRepository.add(userDto)

    return user
  }

  /**
   * Seed a user from currently authenticated user, takes user from request object
   */
  async seedUserFromRequest() {
    const currentUser = this.authDomainService.currentUserSession

    return this.saveUser({ ...currentUser, preferences: preferenceDefault })
  }
}
