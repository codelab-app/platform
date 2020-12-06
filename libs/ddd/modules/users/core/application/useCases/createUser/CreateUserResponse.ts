import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { CreateUserErrors } from './CreateUserErrors'
import { Result } from '@codelab/ddd/shared/core'

export type CreateUserResponse = Either<
  CreateUserErrors.EmailAlreadyExistsError,
  Result<User>
>
