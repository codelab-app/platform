import { Either } from 'fp-ts/lib/Either'
import { Graph } from '../../../domain/graph'
import { UpdateNodeErrors } from './UpdateNodeErrors'
import { Result } from '@codelab/backend'

export type UpdateNodeResponse = Either<
  UpdateNodeErrors.VertexNotFound | UpdateNodeErrors.GraphNotFoundError,
  Result<Graph>
>
