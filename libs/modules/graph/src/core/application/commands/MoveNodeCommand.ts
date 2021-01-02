import { MoveNodeRequest } from '../useCases/MoveNode/MoveNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class MoveNodeCommand implements UseCaseRequestPort<MoveNodeRequest> {
  constructor(public readonly request: MoveNodeRequest) {}
}
