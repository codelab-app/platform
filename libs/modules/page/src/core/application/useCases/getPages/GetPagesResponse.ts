import { Either } from 'fp-ts/Either'
import { Page } from '../../../domain/page'
import { GetPagesErrors } from './GetPagesErrors'
import { Result } from '@codelab/backend'

export type GetPagesResponse = Either<GetPagesErrors.DemoError, Result<Page>>
