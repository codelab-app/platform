import { Either } from 'fp-ts/Either'
import { Graph } from '../../../domain/graph/graph'
import { MoveNodeErrors } from './MoveNodeErrors'
import { Result } from '@codelab/backend'

export type MoveNodeResponse = Either<
  MoveNodeErrors.GraphNotFoundError,
  Result<Graph>
>
