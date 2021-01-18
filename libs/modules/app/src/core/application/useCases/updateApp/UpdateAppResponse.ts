import { Either } from 'fp-ts/Either'
import { App } from '../../../domain/app'
import { UpdateAppErrors } from './UpdateAppErrors'
import { AppError, Result } from '@codelab/backend'

export type UpdateAppResponse = Either<
  UpdateAppErrors.AppNotFoundError | AppError,
  Result<App>
>
