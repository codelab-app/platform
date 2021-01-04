import { GetGraphRequest } from '../useCases/getGraph/GetGraphRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetGraphQuery implements UseCaseRequestPort<GetGraphRequest> {
  constructor(public readonly request: GetGraphRequest) {}
}
