'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { assertIsDefined } from '@codelab/shared/utils'
import { CreateApps } from './app.api.graphql.gen'

export const createAppRepository: IAppRepository['add'] = async (
  app: IAppModel,
) => {
  const {
    createApps: { apps },
  } = await CreateApps({
    input: app.toCreateInput(),
  })

  assertIsDefined(apps[0])

  return apps[0]
}
