import { Option } from 'fp-ts/Option'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { GetAppRequest } from './GetAppRequest'

export class GetAppService {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute(request: GetAppRequest): Promise<Option<App>> {
    return this.appRepository.findOne({ id: request.appId })
  }
}
