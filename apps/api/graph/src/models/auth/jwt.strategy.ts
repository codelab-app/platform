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
      sub: user.userId,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
