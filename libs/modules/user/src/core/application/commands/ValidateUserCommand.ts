import { ValidateUserRequest } from '../useCases/validateUser/ValidateUserRequest'

export class ValidateUserCommand {
  constructor(public readonly request: ValidateUserRequest) {}
}
