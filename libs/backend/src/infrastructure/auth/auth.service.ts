import { Injectable } from '@nestjs/common'
import { User } from '../../../../modules/users/src/core/domain/user'
import { JwtStrategy } from './strategies/jwt.strategy'

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
