import { MoveNodeRequest } from '../useCases/moveNode/MoveNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class MoveNodeCommand implements UseCaseRequestPort<MoveNodeRequest> {
  constructor(public readonly request: MoveNodeRequest) {}
}
