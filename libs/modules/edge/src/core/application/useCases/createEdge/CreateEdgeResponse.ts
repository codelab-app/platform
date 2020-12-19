import { Either } from 'fp-ts/lib/Either'
import { Edge } from '../../../domain/edge'
import { CreateEdgeErrors } from './CreateEdgeErrors'
import { Result } from '@codelab/backend'

export type CreateEdgeResponse = Either<
  CreateEdgeErrors.DemoError,
  Result<Edge>
>
