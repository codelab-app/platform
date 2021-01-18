import { UpdateAppRequest } from '../useCases/updateApp/UpdateAppRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateAppCommand implements UseCaseRequestPort<UpdateAppRequest> {
  constructor(public readonly request: UpdateAppRequest) {}
}
