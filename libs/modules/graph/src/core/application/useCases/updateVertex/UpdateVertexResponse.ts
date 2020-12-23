import { Either } from 'fp-ts/lib/Either'
import { Vertex } from '../../../domain/vertex/vertex'
import { UpdateVertexErrors } from './UpdateVertexErrors'
import { Result } from '@codelab/backend'

export type UpdateVertexResponse = Either<
  UpdateVertexErrors.VertexNotFoundError,
  Result<Vertex>
>
