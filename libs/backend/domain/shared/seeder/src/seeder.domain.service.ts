import { User } from '@codelab/backend/abstract/codegen'
import { PreferenceRepository } from '@codelab/backend/domain/preference'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { UserRepository } from '@codelab/backend/domain/user'
import { IBreakpointType } from '@codelab/shared/abstract/core'
import { breakpoints } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class SeederDomainService {
  constructor(
    private authService: AuthDomainService,
    private userRepository: UserRepository,
    private preferenceRepository: PreferenceRepository,
  ) {}

  /**
   * Seed a user from currently authenticated user, takes user from request object
   */
  async seedUserFromRequest() {
    const currentUser = this.authService.currentUser

    return await this.userRepository.save(currentUser, {
      auth0Id: currentUser.auth0Id,
    })
  }

  /**
   * Seed a user from currently authenticated user, takes user from request object
   */
  async seedUserPreference(owner: User) {
    return await this.preferenceRepository.save(
      {
        builderBreakpointType: IBreakpointType.Desktop,
        builderWidth: breakpoints[IBreakpointType.Desktop].default,
        id: v4(),
        owner,
      },
      { owner: { id: owner.id } },
    )
  }
}
