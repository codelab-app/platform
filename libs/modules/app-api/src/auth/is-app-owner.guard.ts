import {
  GqlAuthGuard,
  isOwnerAddOn,
  StringExtractionFn,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { GetAppService } from '../use-cases'

export const IsAppOwnerAuthGuard = <TInput>(
  extractAppIdFromInput: StringExtractionFn<TInput>,
): any => {
  @Injectable()
  class _IsAppOwnerAuthGuard extends GqlAuthGuard {
    constructor(private getAppService: GetAppService) {
      super()
    }

    canActivate = isOwnerAddOn<TInput>(async (input) => {
      const appId = await extractAppIdFromInput(input)

      if (!appId) {
        throw new Error('appId not found in input')
      }

      const app = await this.getAppService.execute({
        appId,
      })

      if (!app) {
        throw new Error('App not found')
      }

      return app?.ownerId
    })
  }

  return _IsAppOwnerAuthGuard
}
