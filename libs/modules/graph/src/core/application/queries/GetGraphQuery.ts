import { UseCaseRequestPort } from '@codelab/backend'

export class GetGraphQuery implements UseCaseRequestPort<GetGraphQuery> {
  constructor(public readonly request: GetGraphQuery) {}
}
