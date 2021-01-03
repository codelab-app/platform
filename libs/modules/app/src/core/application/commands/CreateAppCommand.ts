import { CreateAppRequest } from '../useCases/createApp/CreateAppRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class CreateAppCommand implements UseCaseRequestPort<CreateAppRequest> {
  constructor(public readonly request: CreateAppRequest) {}
}
