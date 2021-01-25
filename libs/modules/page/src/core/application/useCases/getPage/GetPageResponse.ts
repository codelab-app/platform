import { Either } from 'fp-ts/Either'
import { Page } from '../../../domain/page'
import { GetPageErrors } from './GetPageErrors'
import { Result } from '@codelab/backend'

export type GetPageResponse = Either<
  GetPageErrors.PageNotFoundError,
  Result<Page>
>
