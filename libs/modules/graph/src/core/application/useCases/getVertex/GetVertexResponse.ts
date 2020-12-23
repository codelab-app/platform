import { Either } from 'fp-ts/Either'
import { Vertex } from '../../../domain/vertex/vertex'
import { GetVertexErrors } from './GetVertexErrors'
import { Result } from '@codelab/backend'

export type GetVertexResponse = Either<
  GetVertexErrors.VertexNotFoundError,
  Result<Vertex>
>
