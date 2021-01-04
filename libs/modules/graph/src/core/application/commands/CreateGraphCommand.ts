import { CreateGraphRequest } from '../useCases/createGraph/CreateGraphRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class CreateGraphCommand
  implements UseCaseRequestPort<CreateGraphRequest> {
  constructor(public readonly request: CreateGraphRequest) {}
}
