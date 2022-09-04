import {
  exportInterfaceTypeSelectionSet,
  getDriver,
  getTypeDescendantsOGM,
  InterfaceTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeExport, ITypeKind } from '@codelab/shared/abstract/core'

type Descendant = {
  id: string
  kind: ITypeKind
}

export const exportUserTypes = async (): Promise<Array<ITypeExport>> => {
  /**
   * Export types
   */

  /**
   * Export all types
   *
   * Go through each interface, then grab all descendant ids of it
   */
  const InterfaceType = await InterfaceTypeOGM()

  const interfaceTypes = await InterfaceType.find({
    where: {
      apiOfAtomsAggregate: {
        count: 0,
      },
    },
    selectionSet: exportInterfaceTypeSelectionSet,
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  let dependentTypes: Array<Descendant> = []

  for (const interfaceType of interfaceTypes) {
    const driver = getDriver()
    const session = driver.session()

    const results = await session.run(getTypeDescendantsOGM, {
      id: interfaceType.id,
    })

    // We pass in a single id, so only get 1 record, for each record, we want the first column
    const descendants = [...results.records[0].values()][0] as Array<Descendant>

    // We only get interface type descendants, since other types are pushed in front of interfaces
    const interfaceDescendants = descendants.filter(
      (type) => type.kind === ITypeKind.InterfaceType,
    )

    dependentTypes = [...interfaceDescendants, ...dependentTypes]
  }

  // Here we get all the types that needs to be added
  const orderedInterfaceTypes = dependentTypes
    .map((type) => {
      return interfaceTypes.find((t) => t.id === type.id)
    })
    .filter((x): x is OGM_TYPES.InterfaceType => !!x)

  return [...orderedInterfaceTypes] as Array<ITypeExport>
}
