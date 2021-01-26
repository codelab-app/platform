import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { JwtStrategy } from '../../../infrastructure/auth/strategies/jwt.strategy'

@Injectable()
export class AuthService {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  refreshToken(token: string) {
    return this.jwtStrategy.refreshToken(token)
  }

  getToken(user: User) {
    return this.jwtStrategy.getToken(user)
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10)
  }

  comparePassword(attempt: string, password: string): boolean {
    return bcrypt.compareSync(attempt, password)
  }
}
