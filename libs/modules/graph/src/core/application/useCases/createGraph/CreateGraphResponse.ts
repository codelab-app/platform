import { Either } from 'fp-ts/lib/Either'
import { Graph } from '../../../domain/graph/graph'
import { CreateGraphErrors } from './CreateGraphErrors'
import { Result } from '@codelab/backend'

export type CreateGraphResponse = Either<
  CreateGraphErrors.DemoError,
  Result<Graph>
>
