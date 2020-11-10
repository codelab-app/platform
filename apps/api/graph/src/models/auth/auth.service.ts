import { Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService implements OnModuleInit {
  private declare userService: UserService

  constructor(
    private readonly moduleRef: ModuleRef,
    private authService: AuthService,
  ) {}

  async validateUser() {}

  async registerUser() {}

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }
}
