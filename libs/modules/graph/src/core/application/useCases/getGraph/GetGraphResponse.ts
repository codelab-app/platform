import { Either } from 'fp-ts/lib/Either'
import { Graph } from '../../../domain/graph'
import { GetGraphErrors } from './GetGraphErrors'
import { Result } from '@codelab/backend'

export type GetGraphResponse = Either<
  GetGraphErrors.GraphNotFoundError,
  Result<Graph>
>
