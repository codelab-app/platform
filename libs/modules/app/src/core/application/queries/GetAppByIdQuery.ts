import { GetAppRequest } from '../useCases/getApp/GetAppRequest'

export class GetAppByIdQuery {
  constructor(public readonly request: GetAppRequest) {}
}
