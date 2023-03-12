import 'isomorphic-fetch'
import type { ExportedUserData } from '@codelab/backend/abstract/core'
import { importApps } from '@codelab/backend/application/app'
import { importResources } from '@codelab/backend/application/resource'

export const importUserData = async (
  data: ExportedUserData,
  userId: string,
) => {
  const { apps, resources } = data

  await importResources(resources, userId)

  await importApps(apps, userId)
}
