import { User } from '../../../domain/user'
import { AuthService } from '../../services/AuthService'
import { RegisterUserInput } from './RegisterUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class RegisterUserService
  implements TransactionalUseCase<RegisterUserInput, User> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute(request: RegisterUserInput): Promise<User> {
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
        ...User.create(request),
      },
    })

    const accessToken = await this.authService.getToken(newUser)

    return User.hydrate({
      ...newUser,
      accessToken,
    })
  }
}
