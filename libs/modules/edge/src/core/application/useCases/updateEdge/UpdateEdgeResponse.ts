import { Either } from 'fp-ts/lib/Either'
import { Edge } from '../../../domain/edge'
import { UpdateEdgeErrors } from './UpdateEdgeErrors'
import { Result } from '@codelab/backend'

export type UpdateEdgeResponse = Either<
  UpdateEdgeErrors.EdgeNotFoundError,
  Result<Edge>
>
