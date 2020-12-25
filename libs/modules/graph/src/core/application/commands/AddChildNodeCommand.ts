import { AddChildNodeRequest } from '../useCases/addChildNode/AddChildNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class AddChildNodeCommand
  implements UseCaseRequestPort<AddChildNodeRequest> {
  constructor(public readonly request: AddChildNodeRequest) {}
}
