import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repo.service'

@Injectable()
export class UserDomainService {
  constructor(private userRepository: UserRepository) {}

  async seedUser(user: IUserDTO) {
    return this.userRepository.add([user])
  }
}
