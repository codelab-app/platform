import { User } from '../../../domain/user'
import { AuthService } from '../../services/AuthService'
import { RegisterUserInput } from '../registerUser/RegisterUserInput'
import { LoginUserInput } from './LoginUserInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class LoginUserService
  implements TransactionalUseCase<RegisterUserInput, User> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async execute({ email, password }: LoginUserInput): Promise<User> {
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

    return User.hydrate({
      ...user,
      accessToken,
    })
  }
}
