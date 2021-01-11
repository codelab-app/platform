import { GetAppsRequest } from '../useCases/getApps/GetAppsRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetAppsQuery implements UseCaseRequestPort<GetAppsRequest> {
  constructor(public readonly request: GetAppsRequest) {}
}
