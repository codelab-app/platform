import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ModuleRef } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { Itoken } from './Itoken'
import { ApiConfig, ApiConfigTypes } from '@codelab/alpha/api/providers/config'

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, 'jwt')
  implements OnModuleInit {
  private declare userService: UserService

  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService<ApiConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(ApiConfigTypes.JWT_SECRET),
      passReqToCallback: true,
    })
  }

  async validate(payload: any): Promise<UserEntity> {
    let token = payload.headers.authorization

    token = token.replace('Bearer', '').trim()
    const decodedToken = this.jwtService.decode(token) as Itoken

    return this.userService.findOne(decodedToken.sub)
  }

  async refreshToken(token: string) {
    const user = this.jwtService.verify(token, {
      secret: this.config.get(ApiConfigTypes.JWT_SECRET),
      ignoreExpiration: true,
    })

    // if (Date.now() > (user.exp + this.config.get(ApiConfigTypes.JWT_EXPIRY)) * 1000) {
    //   throw new UnauthorizedException('Token expired');
    // }

    delete user.iat
    delete user.exp

    return this.jwtService.sign({
      username: user.username,
      sub: user.sub,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.sub,
      },
    })
  }

  async getToken(user: UserEntity) {
    const payload = {
      username: user.email,
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

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }
}
