import { CreatePageRequest } from '../useCases/createPage/CreatePageRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class CreatePageCommand
  implements UseCaseRequestPort<CreatePageRequest> {
  constructor(public readonly request: CreatePageRequest) {}
}
