import { GetPagesRequest } from '../useCases/getPages/GetPagesRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetPagesQuery implements UseCaseRequestPort<GetPagesRequest> {
  constructor(public readonly request: GetPagesRequest) {}
}
