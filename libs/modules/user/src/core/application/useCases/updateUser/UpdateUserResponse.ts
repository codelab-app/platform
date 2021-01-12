import { Either } from 'fp-ts/Either'
import { User } from '../../../domain/user'
import { DeleteUserErrors } from '../deleteUser/DeleteUserErrors'
import { AppError, Result } from '@codelab/backend'

export type UpdateUserResponse = Either<
  DeleteUserErrors.UserNotFoundError | AppError,
  Result<User>
>
