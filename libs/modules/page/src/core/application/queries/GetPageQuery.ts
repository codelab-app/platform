import { GetPageRequest } from '../useCases/getPage/GetPageRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetPageQuery implements UseCaseRequestPort<GetPageRequest> {
  constructor(public readonly request: GetPageRequest) {}
}
