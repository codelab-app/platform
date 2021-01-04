import { LoginUserRequest } from '../useCases/loginUser/LoginUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class LoginUserQuery implements UseCaseRequestPort<LoginUserRequest> {
  constructor(public readonly request: LoginUserRequest) {}
}
