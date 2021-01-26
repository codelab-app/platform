import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtStrategy } from '../../../infrastructure/auth/strategies/jwt.strategy'

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
