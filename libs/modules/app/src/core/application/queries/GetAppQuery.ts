import { GetAppRequest } from '../useCases/getApp/GetAppRequest'

export class GetAppQuery {
  constructor(public readonly request: GetAppRequest) {}
}
