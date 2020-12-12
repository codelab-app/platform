import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { DeleteUserErrors } from '../deleteUser/DeleteUserErrors'
import { Result } from '@codelab/ddd/backend'

export type EditUserResponse = Either<
  DeleteUserErrors.UserNotFoundError,
  Result<User>
>
