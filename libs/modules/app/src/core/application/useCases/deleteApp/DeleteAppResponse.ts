import { Either } from 'fp-ts/lib/Either'
import { App } from '../../../domain/app'
import { DeleteAppErrors } from './DeleteAppErrors'
import { Result } from '@codelab/backend'

export type DeleteAppResponse = Either<
  DeleteAppErrors.AppNotFoundError,
  Result<App>
>
