import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { DeleteUserErrors } from '../deleteUser/DeleteUserErrors'
import { Result } from '@codelab/backend'

export type UpdateUserResponse = Either<
  DeleteUserErrors.UserNotFoundError,
  Result<User>
>
