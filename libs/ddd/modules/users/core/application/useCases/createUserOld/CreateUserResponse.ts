import { CreateUserErrors } from './CreateUserErrors'
import { AppError, Either, Result } from '@codelab/ddd/shared/core'

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>
