import { Either } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { App } from '../../../domain/app'
import { GetAppErrors } from './GetAppErrors'
import { Result } from '@codelab/backend'

export type GetAppResponse = Either<GetAppErrors.NotFound, Result<Option<App>>>
