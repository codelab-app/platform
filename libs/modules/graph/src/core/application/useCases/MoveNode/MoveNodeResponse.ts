import { Either } from 'fp-ts/lib/Either'
import { Graph } from '../../../domain/graph'
import { MoveNodeErrors } from './MoveNodeErrors'
import { Result } from '@codelab/backend'

export type MoveNodeResponse = Either<
  MoveNodeErrors.GraphNotFoundError,
  Result<Graph>
>
