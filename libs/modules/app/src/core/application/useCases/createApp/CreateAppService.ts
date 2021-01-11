import { plainToClass } from 'class-transformer'
import { right } from 'fp-ts/lib/Either'
import { SerializedAppDto } from '../../../../../../user/src/core/domain/dto/SerializedAppDto'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { CreateAppRequest } from './CreateAppRequest'
import { CreateAppResponse } from './CreateAppResponse'
import { CreateAppUseCase } from './CreateAppUseCase'
import { NOID, Result } from '@codelab/backend'

export class CreateAppService implements CreateAppUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({ user, title }: CreateAppRequest): Promise<CreateAppResponse> {
    const app = plainToClass<App<NOID>, SerializedAppDto>(App, { title })

    const createdApp = await this.appRepository.create(app, user)

    return right(Result.ok(createdApp))
  }
}
