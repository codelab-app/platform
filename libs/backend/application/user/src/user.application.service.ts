import { AuthService } from '@codelab/backend/application/shared'
import { UserRepository } from '@codelab/backend/domain/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserApplicationService {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  async seedUserFromRequest() {
    const currentUser = this.authService.currentUser

    const user = await this.userRepository.save(currentUser, {
      auth0Id: currentUser.auth0Id,
    })
  }
}
