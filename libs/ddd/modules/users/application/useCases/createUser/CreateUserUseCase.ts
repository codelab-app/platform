import { User } from '../../../domain/user'
import { UserEmail } from '../../../domain/user-email'
import { UserPassword } from '../../../domain/user-password'
import { IUserRepo } from '../../../infra/repos/userRepo'
import { CreateUserDTO } from './CreateUserDTO'
import { CreateUserErrors } from './CreateUserErrors'
import {
  AppError,
  Either,
  Result,
  UseCase,
  left,
  right,
} from '@codelab/ddd/shared/domain'

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const emailResult = UserEmail.create({ value: request.email })
    const passwordResult = UserPassword.create({ value: request.password })

    const dtoResult = Result.combine([emailResult, passwordResult])

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.errors)) as Response
    }

    const email: UserEmail = emailResult.value
    const password: UserPassword = passwordResult.value

    const userAlreadyExists = this.userRepo.getUserByEmail(email)

    if (userAlreadyExists) {
      return left(new CreateUserErrors.EmailAlreadyExistsError(email.value))
    }

    const userResult = User.create({ email, password })

    if (userResult.isFailure) {
      return left(Result.fail<void>(userResult.errors.toString()))
    }

    const user = userResult.value

    try {
      await this.userRepo.save(user)

      return right(Result.ok<void>())
    } catch (e) {
      return left(new AppError.UnexpectedError(e)) as Response
    }
  }
}
