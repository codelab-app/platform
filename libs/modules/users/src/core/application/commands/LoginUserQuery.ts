import { LoginUserRequest } from '../useCases/LoginUser/LoginUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class LoginUserQuery implements UseCaseRequestPort<LoginUserRequest> {
  constructor(public readonly request: LoginUserRequest) {}
}
