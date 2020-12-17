import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { DeleteUserErrors } from './DeleteUserErrors'
import { Result } from '@codelab/backend'

export type DeleteUserResponse = Either<
  DeleteUserErrors.UserNotFoundError,
  Result<User>
>
