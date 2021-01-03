import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { UserService } from '../../../../../../users/src/core/application/services/UserService'
import { UsersDITokens } from '../../../../../../users/src/framework/UsersDITokens'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { CreateAppErrors } from './CreateAppErrors'
import { CreateAppRequest } from './CreateAppRequest'
import { CreateAppResponse } from './CreateAppResponse'
import { CreateAppUseCase } from './CreateAppUseCase'
import { Result } from '@codelab/backend'

export class CreateAppService implements CreateAppUseCase, OnModuleInit {
  declare userService: UserService

  constructor(
    private readonly appRepository: AppRepositoryPort,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(request: CreateAppRequest): Promise<CreateAppResponse> {
    const app = App.create(request)
    const { userId } = request

    const user = await this.userService.findUserById(userId)

    if (isNone(user)) {
      return left(new CreateAppErrors.UserNotFoundError(userId))
    }

    const createdApp = await this.appRepository.createApp(app, user.value)

    return right(Result.ok(createdApp))
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersDITokens.UserService, {
      strict: false,
    })
  }
}
