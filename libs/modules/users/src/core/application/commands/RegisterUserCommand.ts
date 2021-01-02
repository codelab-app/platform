import { RegisterUserRequest } from '../useCases/registerUser/RegisterUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class RegisterUserCommand
  implements UseCaseRequestPort<RegisterUserRequest> {
  constructor(public readonly request: RegisterUserRequest) {}
}
