import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
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

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['editor', 'user', 'mod'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': '1234567890',
        'x-hasura-org-id': '123',
        'x-hasura-custom': 'custom-value',
      },
    }

    return this.jwtService.sign(payload)
  }
}
