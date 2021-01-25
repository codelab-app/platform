import { Either } from 'fp-ts/Either'
import { Graph } from '../../../domain/graph/graph'
import { DeleteNodeErrors } from './DeleteNodeErrors'
import { Result } from '@codelab/backend'

export type DeleteNodeResponse = Either<
  DeleteNodeErrors.VertexNotFound,
  Result<Graph>
>
