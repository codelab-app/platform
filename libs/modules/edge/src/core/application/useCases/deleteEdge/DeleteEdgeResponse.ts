import { Either } from 'fp-ts/lib/Either'
import { Edge } from '../../../domain/edge'
import { DeleteEdgeErrors } from './DeleteEdgeErrors'
import { Result } from '@codelab/backend'

export type DeleteEdgeResponse = Either<
  DeleteEdgeErrors.EdgeNotFoundError,
  Result<Edge>
>
