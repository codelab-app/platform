import { LoginUserRequest } from '../useCases/loginUser/LoginUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class LoginUserCommand implements UseCaseRequestPort<LoginUserRequest> {
  constructor(public readonly request: LoginUserRequest) {}
}
