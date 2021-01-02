import { Injectable, OnModuleInit } from '@nestjs/common'
import { JwtStrategy } from '../../../infrastructure/auth/strategies/jwt.strategy'
import { User } from '../../domain/user'

@Injectable()
export class AuthService {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async refreshToken(token: string) {
    return this.jwtStrategy.refreshToken(token)
  }

  async getToken(user: User) {
    return this.jwtStrategy.getToken(user)
  }
}
