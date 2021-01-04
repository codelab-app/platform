import { UpdateNodeRequest } from '../useCases/updateNode/UpdateNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateNodeCommand
  implements UseCaseRequestPort<UpdateNodeRequest> {
  constructor(public readonly request: UpdateNodeRequest) {}
}
