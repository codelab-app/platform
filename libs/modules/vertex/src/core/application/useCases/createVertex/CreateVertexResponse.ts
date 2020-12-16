import { Either } from 'fp-ts/lib/Either'
import { Vertex } from '../../../domain/vertex'
import { CreateVertexErrors } from './CreateVertexErrors'
import { Result } from '@codelab/backend'

export type CreateVertexResponse = Either<
  CreateVertexErrors.CreateVertexError,
  Result<Vertex>
>
