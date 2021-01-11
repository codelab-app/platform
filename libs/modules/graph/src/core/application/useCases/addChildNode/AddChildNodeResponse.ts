import { Either } from 'fp-ts/Either'
import { Graph } from '../../../domain/graph/graph'
import { AddChildNodeErrors } from './AddChildNodeErrors'
import { Result } from '@codelab/backend'

export type AddChildNodeResponse = Either<
  | AddChildNodeErrors.GraphNotFoundError
  | AddChildNodeErrors.VertexNotFoundError,
  Result<Graph>
>
