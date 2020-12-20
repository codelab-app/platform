import { Either } from 'fp-ts/Either'
import { GetVertexErrors } from './GetVertexErrors'
import { Result } from '@codelab/backend'
import { Vertex } from '@codelab/modules/vertex'

export type GetVerticesResponse = Either<
  GetVertexErrors.VertexNotFoundError,
  Result<Array<Vertex>>
>
