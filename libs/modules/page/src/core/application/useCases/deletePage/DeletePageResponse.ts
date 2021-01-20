import { Either } from 'fp-ts/Either'
import { Page } from '../../../domain/page'
import { DeletePageErrors } from './DeletePageErrors'
import { Result } from '@codelab/backend'

export type DeletePageResponse = Either<
  DeletePageErrors.PageNotFoundError,
  Result<Page>
>
