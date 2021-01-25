import { Either } from 'fp-ts/Either'
import { User } from '../../../domain/user'
import { GetMeErrors } from './GetMeErrors'
import { Result } from '@codelab/backend'

export type GetMeResponse = Either<GetMeErrors.UserNotFoundError, Result<User>>
