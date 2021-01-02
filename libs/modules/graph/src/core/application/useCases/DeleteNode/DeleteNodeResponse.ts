import { Either } from 'fp-ts/lib/Either'
import { Graph } from '../../../domain/graph'
import { DeleteNodeErrors } from './DeleteNodeErrors'
import { Result } from '@codelab/backend'

export type DeleteNodeResponse = Either<
  DeleteNodeErrors.VertexNotFound,
  Result<Graph>
>
