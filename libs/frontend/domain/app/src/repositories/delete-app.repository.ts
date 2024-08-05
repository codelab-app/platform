'use server'

import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { App } from '../store'
import { DeleteApps } from './app.api.graphql.gen'

export const deleteAppRepository: IAppRepository['delete'] = async (
  apps: Array<IAppModel>,
) => {
  const {
    deleteApps: { nodesDeleted },
  } = await DeleteApps({
    delete: App.toDeleteInput(),
    where: { id_IN: apps.map((app) => app.id) },
  })

  return nodesDeleted
}
