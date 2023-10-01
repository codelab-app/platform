import { AuthDomainService } from '@codelab/backend/domain/shared'
import { UserRepository } from '@codelab/backend/domain/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserApplicationService {
  constructor(
    private authService: AuthDomainService,
    private userRepository: UserRepository,
  ) {}

  async seedUserFromRequest() {
    const currentUser = this.authService.currentUser

    const user = await this.userRepository.save(currentUser, {
      auth0Id: currentUser.auth0Id,
    })
  }
}
