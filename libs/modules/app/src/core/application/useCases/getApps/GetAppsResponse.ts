import { Either } from 'fp-ts/lib/Either'
import { App } from '../../../domain/app'
import { GetAppsErrors } from './GetAppsErrors'
import { Result } from '@codelab/backend'

export type GetAppsResponse = Either<
  GetAppsErrors.DemoError,
  Result<Array<App>>
>
