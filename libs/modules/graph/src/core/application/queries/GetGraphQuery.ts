import { GetGraphRequest } from '../useCases/GetGraph/GetGraphRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetGraphQuery implements UseCaseRequestPort<GetGraphRequest> {
  constructor(public readonly request: GetGraphRequest) {}
}
