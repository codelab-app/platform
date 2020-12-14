import { UpdateUserRequest } from '../useCases/updateUser/UpdateUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateUserCommand
  implements UseCaseRequestPort<UpdateUserRequest> {
  constructor(public readonly request: UpdateUserRequest) {}
}
