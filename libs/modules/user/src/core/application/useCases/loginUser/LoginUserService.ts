import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthService } from '../../services/AuthService'
import { RegisterUserInput } from '../registerUser/RegisterUserInput'
import { LoginUserInput } from './LoginUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class LoginUserService
  implements TransactionalUseCase<RegisterUserInput, User> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute({ email, password }: LoginUserInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('Incorrect email & password combination')
    }

    const passwordMatch = this.authService.comparePassword(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new Error('Incorrect email & password combination')
    }

    const accessToken = await this.authService.getToken(user)

    return {
      ...user,
      accessToken,
    }
  }
}
