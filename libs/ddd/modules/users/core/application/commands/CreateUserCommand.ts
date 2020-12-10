import { CreateUserRequest } from '../useCases/createUser/CreateUserRequest'
import { UseCaseRequestPort } from '@codelab/ddd/backend/core'

// stackoverflow.com/questions/32216408/cqrs-commands-and-queries-do-they-belong-in-the-domain#:~:text=From%20a%20DDD%20strategic%20point,business%20concepts%20and%20use%20cases.&text=However%20all%20domain%20use%20cases,queries%20used%20by%20the%20domain.

export class CreateUserCommand
  implements UseCaseRequestPort<CreateUserRequest> {
  constructor(public readonly request: CreateUserRequest) {}
}
