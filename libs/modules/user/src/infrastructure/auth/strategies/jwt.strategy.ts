import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CommandBus } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { classToPlain } from 'class-transformer'
import { isNone } from 'fp-ts/Option'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ValidateUserCommand } from '../../../core/application/commands/ValidateUserCommand'
import { IToken } from '../IToken'
import { JwtConfig } from '../config/JwtConfig'
import { User } from '@codelab/modules/user'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private jwtService: JwtService,
    private moduleRef: ModuleRef,
    private commandBus: CommandBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(payload: any): Promise<User> {
    let token = payload.headers.authorization

    token = token.replace('Bearer', '').trim()
    const decodedToken = this.jwtService.decode(token) as IToken

    const user = await this.commandBus.execute(
      new ValidateUserCommand({ userId: decodedToken.sub }),
    )

    if (isNone(user)) {
      throw new UnauthorizedException()
    }

    return user.value
  }

  async refreshToken(token: string) {
    const user = this.jwtService.verify(token, {
      secret: JwtConfig.JWT_SECRET,
      ignoreExpiration: true,
    })

    // if (Date.now() > (user.exp + this.config.get(ApiConfigTypes.JWT_EXPIRY)) * 1000) {
    //   throw new UnauthorizedException('Token expired');
    // }

    // delete user.iat
    // delete user.exp

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

  async getToken(user: any) {
    const plainUser = classToPlain(user)
    const payload = {
      username: plainUser.email,
      sub: plainUser.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': plainUser.id,
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
