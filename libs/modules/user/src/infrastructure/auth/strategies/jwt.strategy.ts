import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ValidateUserCommand } from '../../../core/application/commands/ValidateUserCommand'
import { User } from '../../../presentation/User'
import { IToken } from '../IToken'
import { JwtConfig } from '../config/JwtConfig'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commandBus: CommandBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(payload: any): Promise<User> {
    const { authorization } = payload.headers
    const token = authorization.replace('Bearer', '').trim()
    const decodedToken = this.jwtService.decode(token) as IToken

    const user: User = await this.commandBus.execute(
      new ValidateUserCommand({ userId: decodedToken.sub }),
    )

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

  refreshToken(token: string) {
    const user = this.jwtService.verify(token, {
      secret: JwtConfig.JWT_SECRET,
      ignoreExpiration: true,
    })

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

  getToken(user: { email: string; id: string }) {
    const payload = {
      username: user.email,
      sub: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': user.id,
      },
    }

    return this.jwtService.sign(payload)
  }

  // async login(user: { username: string; userId: number }) {
  //   const payload = {
  //     username: user.username,
  //     sub: user.userId.toString(),
  //     'https://hasura.io/jwt/claims': {
  //       'x-hasura-allowed-roles': ['admin'],
  //       'x-hasura-default-role': 'admin',
  //       'x-hasura-user-id': user.userId.toString(),
  //     },
  //   }

  //   return this.jwtService.sign(payload)
  // }
}
