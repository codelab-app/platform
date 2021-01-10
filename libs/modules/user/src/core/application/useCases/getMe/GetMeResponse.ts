import { Either } from 'fp-ts/lib/Either'
import { User } from '../../../domain/user'
import { GetMeErrors } from './GetMeErrors'
import { Result, UUID } from '@codelab/backend'

export type GetMeResponse = Either<
  GetMeErrors.UserNotFoundError,
  Result<User<UUID>>
>
