'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { assertIsDefined } from '@codelab/shared/utils'
import { appApi } from './app.api'

export const createAppRepository: IAppRepository['add'] = async (
  app: IAppModel,
) => {
  const {
    createApps: { apps },
  } = await appApi.CreateApps({
    input: app.toCreateInput(),
  })

  assertIsDefined(apps[0])

  return apps[0]
}
