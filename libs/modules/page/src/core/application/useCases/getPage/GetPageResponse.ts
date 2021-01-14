import { Either } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { Page } from '../../../domain/page'
import { GetPageErrors } from './GetPageErrors'
import { Result } from '@codelab/backend'

export type GetPageResponse = Either<
  GetPageErrors.DemoError,
  Result<Option<Page>>
>
