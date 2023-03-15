import type { IInterfaceTypeExport } from '@codelab/backend/abstract/core'
import {
  exportInterfaceTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { sortInterfaceTypesFields } from '../mapper/sort'

/**
 * These are types created by the admin, mostly types related to an atom.
 *
 * We export api separately since those can be it's own file
 */
export const exportAdminInterfaceTypes = async (): Promise<
  Array<IInterfaceTypeExport>
> => {
  /**
   * Get all interfaces that are connected to atoms, here we don't do dependent types since Ant Design atoms don't have them (at least I haven't seen any)
   *
   * We will go through dependent types for user interfaces however
   */
  const InterfaceType = await Repository.instance.InterfaceType

  const interfaceTypes = await InterfaceType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportInterfaceTypeSelectionSet,
    // Where it is assigned to atom
    where: {
      apiOfAtomsAggregate: {
        count_GTE: 0,
      },
    },
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  return [
    ...sortInterfaceTypesFields(interfaceTypes),
  ] as Array<IInterfaceTypeExport>
}
