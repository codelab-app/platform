import { DeleteUserRequest } from '../useCases/deleteUser/DeleteUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteUserCommand
  implements UseCaseRequestPort<DeleteUserRequest> {
  constructor(public readonly request: DeleteUserRequest) {}
}
