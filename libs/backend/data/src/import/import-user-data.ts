import 'isomorphic-fetch'
import type { ExportedData } from '@codelab/backend/abstract/core'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { importApps } from './import-apps'
import { importResources } from './import-resources'

export const importUserData = async (
  data: ExportedData,
  owner: IAuth0Owner,
) => {
  const { apps, atoms, types, resources } = data

  // await importTypes(types, userId, (type) => ({ id: type.id }))

  // await importAtoms({
  //   atoms,
  //   userId: selectedUserId,
  //   atomWhere: (atom) => ({ id: atom.id }),
  //   tagWhere: (tag) => ({ id: tag.id }),
  // })

  await importResources(resources, owner)

  await importApps(apps, owner)
}
