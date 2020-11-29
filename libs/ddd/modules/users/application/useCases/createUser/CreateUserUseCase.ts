import { IUserRepo } from '../../../infra/repos/userRepo'
import { CreateUserDTO } from './CreateUserDTO'
import { CreateUserErrors } from './CreateUserErrors'
import {
  AppError,
  Either,
  Result,
  UseCase,
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
    // const emailOrError = UserEmail.create(request.email)
    // const passwordOrError = UserPassword.create({ value: request.password })

    // const dtoResult = Result.combine([emailOrError, passwordOrError])

    // // if (dtoResult.isFailure) {
    // //   return left(Result.fail<void>(dtoResult.error)) as Response
    // // }

    // const email: UserEmail = emailOrError.getValue()
    // const password: UserPassword = passwordOrError.getValue()

    return right(Result.ok<void>())
    // try {
    //   const userAlreadyExists = await this.userRepo.exists(email)

    //   if (userAlreadyExists) {
    //     return left(
    //       new CreateUserErrors.EmailAlreadyExistsError(email.value),
    //     ) as Response
    //   }

    //   try {
    //     const alreadyCreatedUserByUserName = await this.userRepo.getUserByUserName(
    //       username,
    //     )

    //     const userNameTaken = !!alreadyCreatedUserByUserName === true

    //     if (userNameTaken) {
    //       return left(
    //         new CreateUserErrors.UsernameTakenError(username.value),
    //       ) as Response
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }

    //   const userOrError: Result<User> = User.create({
    //     email,
    //     password,
    //     username,
    //   })

    //   if (userOrError.isFailure) {
    //     return left(Result.fail<User>(userOrError.error.toString())) as Response
    //   }

    //   const user: User = userOrError.getValue()

    //   await this.userRepo.save(user)

    //   return right(Result.ok<void>())
    // } catch (err) {
    //   return left(new AppError.UnexpectedError(err)) as Response
    // }
  }
}
