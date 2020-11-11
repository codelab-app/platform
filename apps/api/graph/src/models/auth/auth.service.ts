import { Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { UserService } from '../user/user.service'
import { JwtStrategy } from './jwt.strategy'

@Injectable()
export class AuthService implements OnModuleInit {
  private declare userService: UserService

  constructor(
    private readonly moduleRef: ModuleRef,
    private jwtStrategy: JwtStrategy,
  ) {}

  async validateUser() {}

  async registerUser() {}

  async createAuthToken() {
    const user = {
      username: 'test',
      userId: 1,
    }

    return this.jwtStrategy.login(user)
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }
}
