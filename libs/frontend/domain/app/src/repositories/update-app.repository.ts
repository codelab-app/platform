'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { assertIsDefined } from '@codelab/shared/utils'
import { UpdateApps } from './app.api.graphql.gen'

export const updateAppRepository: IAppRepository['update'] = async (
  app: IAppModel,
) => {
  const {
    updateApps: { apps },
  } = await UpdateApps({
    update: app.toUpdateInput(),
    where: { id: app.id },
  })

  assertIsDefined(apps[0])

  return apps[0]
}
