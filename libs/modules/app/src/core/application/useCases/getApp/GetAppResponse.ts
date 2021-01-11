import { Either } from 'fp-ts/lib/Either'
import { App } from '../../../domain/app'
import { GetAppErrors } from './GetAppErrors'
import { Result } from '@codelab/backend'

export type GetAppResponse = Either<GetAppErrors.NotFound, Result<App>>
