import { GetAppRequest } from '../useCases/getApp/GetAppRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetAppQuery implements UseCaseRequestPort<GetAppRequest> {
  constructor(public readonly request: GetAppRequest) {}
}
