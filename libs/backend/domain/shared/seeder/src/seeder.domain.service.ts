import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { UserRepository } from '@codelab/backend/domain/user'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Injectable()
export class SeederDomainService {
  constructor(
    private authService: AuthDomainService,
    private userRepository: UserRepository,
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
}
