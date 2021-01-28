import { Injectable } from '@nestjs/common'
import { UserDto } from '../../../domain/UserDto'
import { AuthService } from '../../services/AuthService'
import { RegisterUserInput } from './RegisterUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class RegisterUserService
  implements TransactionalUseCase<RegisterUserInput, UserDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute(request: RegisterUserInput) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: request.email },
    })

    if (existingUser) {
      throw new Error(
        `The email ${request.email} associated for this account already exists`,
      )
    }

    const newUser = await this.prismaService.user.create({
      data: {
        ...request,
        password: this.authService.hashPassword(request.password),
      },
    })

    const accessToken = await this.authService.getToken(newUser)

    return {
      ...newUser,
      accessToken,
    }
  }
}
