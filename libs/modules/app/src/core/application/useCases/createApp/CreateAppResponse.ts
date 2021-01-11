import { Either } from 'fp-ts/Either'
import { App } from '../../../domain/app'
import { CreateAppErrors } from './CreateAppErrors'
import { Result } from '@codelab/backend'

export type CreateAppResponse = Either<
  CreateAppErrors.UserNotFoundError,
  Result<App>
>
