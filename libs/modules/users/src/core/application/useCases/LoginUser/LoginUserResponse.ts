import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { LoginUserErrors } from './LoginUserErrors'
import { Result } from '@codelab/backend'

export type LoginUserResponse = Either<
  LoginUserErrors.UserNotFoundError | LoginUserErrors.WrongPasswordError,
  Result<User>
>
