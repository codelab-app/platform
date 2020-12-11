import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { CreateUserErrors } from './CreateUserErrors'
import { Result } from '@codelab/ddd/backend'

export type CreateUserResponse = Either<
  CreateUserErrors.EmailAlreadyExistsError,
  Result<User>
>
