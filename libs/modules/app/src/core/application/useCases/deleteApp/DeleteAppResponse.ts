import { Either } from 'fp-ts/Either'
import { App } from '../../../domain/app'
import { DeleteAppErrors } from './DeleteAppErrors'
import { Result } from '@codelab/backend'

export type DeleteAppResponse = Either<
  DeleteAppErrors.AppNotFoundError,
  Result<App>
>
