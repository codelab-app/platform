import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { CreateUserErrors } from './CreateUserErrors'
import { AppError, Result } from '@codelab/ddd/shared/core'

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | AppError.UnexpectedError
  | Result<any>,
  Result<User>
>
