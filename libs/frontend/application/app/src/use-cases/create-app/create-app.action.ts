'use server'

import type { IAppService } from '@codelab/frontend/abstract/application'
import type { ICreateAppData } from '@codelab/frontend/abstract/domain'

export const createApp =
  (appService: IAppService) => (appDto: ICreateAppData) => {
    // return appService.create(appDto)
    return Promise.resolve()
  }
