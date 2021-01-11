import { Either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { App } from '../../../domain/app'
import { GetAppErrors } from './GetAppErrors'
import { Result } from '@codelab/backend'

export type GetAppResponse = Either<GetAppErrors.NotFound, Result<Option<App>>>
