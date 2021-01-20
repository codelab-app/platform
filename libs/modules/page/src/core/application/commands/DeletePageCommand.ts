import { DeletePageRequest } from '../useCases/deletePage/DeletePageRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeletePageCommand
  implements UseCaseRequestPort<DeletePageRequest> {
  constructor(public readonly request: DeletePageRequest) {}
}
