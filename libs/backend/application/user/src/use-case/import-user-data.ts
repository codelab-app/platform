import 'isomorphic-fetch'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { importApps, importComponents } from '@codelab/backend/application/app'
import { importResources } from '@codelab/backend/application/resource'
import { importUserTypes } from '@codelab/backend/application/type'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'

export const importUserData = async (
  data: IUserDataExport,
  owner: IAuth0Owner,
) => {
  const { apps, components, fields, resources, types } = data

  await importResources(resources, owner)

  await importUserTypes(fields, types, owner)

  await importApps(apps, owner)

  await importComponents(components, apps, owner)
}
