import { Either } from 'fp-ts/lib/Either'
import { DeleteResult } from 'typeorm'
import { DeleteUserErrors } from './DeleteUserErrors'
import { Result } from '@codelab/ddd/backend'

export type DeleteUserResponse = Either<
  DeleteUserErrors.UserNotFoundError,
  Result<DeleteResult>
>
