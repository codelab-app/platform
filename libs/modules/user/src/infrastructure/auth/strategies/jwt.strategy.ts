import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaDITokens } from '../../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { User } from '../../../core/domain/User'
import { IToken } from '../IToken'
import { JwtConfig } from '../config/JwtConfig'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
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

    const user = await this.prismaService.user.findUnique({
      where: {
        id: decodedToken.sub,
      },
    })

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
