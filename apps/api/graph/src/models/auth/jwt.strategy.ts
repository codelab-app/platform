import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from '../user/user.entity'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
    }
  }

  async getToken(user: UserEntity) {
    const payload = {
      username: user.username,
      sub: user.id.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': user.id.toString(),
      },
    }

    return this.jwtService.sign(payload)
  }

  async login(user: { username: string; userId: number }) {
    const payload = {
      username: user.username,
      sub: user.userId.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': user.userId.toString(),
      },
    }

    return this.jwtService.sign(payload)
  }
}
