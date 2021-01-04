import { GetMeRequest } from '../useCases/getMe/GetMeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetMeQuery implements UseCaseRequestPort<GetMeRequest> {
  constructor(public readonly request: GetMeRequest) {}
}
