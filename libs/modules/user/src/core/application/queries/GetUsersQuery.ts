import { GetUserRequest } from '../useCases/getUser/GetUserRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetUsersQuery implements UseCaseRequestPort<GetUserRequest> {
  constructor(public readonly request: GetUserRequest) {}
}
