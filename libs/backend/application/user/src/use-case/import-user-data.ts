import 'isomorphic-fetch'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { importApps } from '@codelab/backend/application/app'
import { importResources } from '@codelab/backend/application/resource'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'

export const importUserData = async (
  data: IUserDataExport,
  owner: IAuth0Owner,
) => {
  const { apps, resources } = data

  await importResources(resources, owner)

  await importApps(apps, owner)
}
