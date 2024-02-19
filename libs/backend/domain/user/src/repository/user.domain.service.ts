import type { IUserDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repo.service'

@Injectable()
export class UserDomainService {
  constructor(private userRepository: UserRepository) {}

  async seedUser(user: IUserDto) {
    return this.userRepository.add(user)
  }
}
