import { Either } from 'fp-ts/Either'
import { Edge } from '../../../domain/edge'
import { GetEdgeErrors } from './GetEdgeErrors'
import { Result } from '@codelab/backend'

export type GetEdgeResponse = Either<
  GetEdgeErrors.EdgeNotFoundError,
  Result<Edge>
>
