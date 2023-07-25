import 'isomorphic-fetch'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { importApps, importComponents } from '@codelab/backend/application/app'
import { importResources } from '@codelab/backend/application/resource'
import type { IAuth0User } from '@codelab/shared/abstract/core'

export const importUserData = async (
  data: IUserDataExport,
  owner: IAuth0User,
) => {
  const { apps, components, fields, resources, types } = data

  await importResources(resources, owner)

  await importUserTypes(fields, types, owner)

  await importApps(apps, owner)

  await importComponents(components, apps, owner)
}
