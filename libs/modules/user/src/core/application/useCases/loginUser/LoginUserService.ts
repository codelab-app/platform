import { Inject, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CodelabError } from '../../../../../../../../apps/api/codelab/src/app/CodelabError'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { AuthService } from '../../services/AuthService'
import { RegisterUserInput } from '../registerUser/RegisterUserInput'
import { LoginUserInput } from './LoginUserInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class LoginUserService
  implements TransactionalUseCase<RegisterUserInput, User> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute({ email, password }: LoginUserInput) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new CodelabError('Incorrect email & password combination')
      }

      const passwordMatch = this.authService.comparePassword(
        password,
        user.password,
      )

      if (!passwordMatch) {
        throw new CodelabError('Incorrect email & password combination')
      }

      const accessToken = await this.authService.getToken(user)

      return {
        ...user,
        accessToken,
      }
    } catch (e) {
      throw new CodelabPrismaError(`Incorrect email & password combination`, e)
    }
  }
}
