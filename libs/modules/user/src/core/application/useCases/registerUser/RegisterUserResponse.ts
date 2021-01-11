import { Either } from 'fp-ts/Either'
import { User } from '../../../domain/user'
import { RegisterUserErrors } from './RegisterUserErrors'
import { Result } from '@codelab/backend'

export type RegisterUserResponse = Either<
  RegisterUserErrors.EmailAlreadyExistsError,
  Result<User>
>
