import { Either } from 'fp-ts/lib/Either'
import { Vertex } from '../../../domain/vertex/vertex'
import { DeleteVertexErrors } from './DeleteVertexErrors'
import { Result } from '@codelab/backend'

export type DeleteVertexResponse = Either<
  DeleteVertexErrors.VertexNotFoundError,
  Result<Vertex>
>
