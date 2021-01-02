import { UpdateNodeRequest } from '../useCases/UpdateNode/UpdateNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateNodeCommand
  implements UseCaseRequestPort<UpdateNodeRequest> {
  constructor(public readonly request: UpdateNodeRequest) {}
}
