import { Either } from 'fp-ts/lib/Either'
import { SerializedUserDto } from '../../../domain/dto/SerializedUserDto'
import { CreateUserErrors } from './CreateUserErrors'
import { Result } from '@codelab/backend'

export type CreateUserResponse = Either<
  CreateUserErrors.EmailAlreadyExistsError,
  Result<SerializedUserDto>
>
