import { EditUserRequest } from '../useCases/editUser/EditUserRequest'
import { UseCaseRequestPort } from '@codelab/ddd/backend'

export class EditUserCommand implements UseCaseRequestPort<EditUserRequest> {
  constructor(public readonly request: EditUserRequest) {}
}
