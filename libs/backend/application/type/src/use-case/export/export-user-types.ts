import {
  type InterfaceType,
  SortDirection,
} from '@codelab/backend/abstract/codegen'
import type { ITypesExport } from '@codelab/backend/abstract/core'
import {
  exportArrayTypeSelectionSet,
  exportFieldSelectionSet,
  exportInterfaceTypeSelectionSet,
  getDriver,
  getTypeDescendantsOGM,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

interface Descendant {
  id: string
  kind: ITypeKind
}

/**
 * Export types
 */
export const exportUserTypes = async (
  owner?: IAuth0Owner,
): Promise<ITypesExport> => {
  const InterfaceType = await Repository.instance.InterfaceType
  const Array = await Repository.instance.ArrayType
  const Field = await Repository.instance.Field

  /**
   * Go through each interface owned by user, then grab all descendant ids of it
   */
  const interfaceTypes = await InterfaceType.find({
    options: { sort: [{ name: SortDirection.Asc }] },
    selectionSet: exportInterfaceTypeSelectionSet,
    where: {
      apiOfAtomsAggregate: { count: 0 },
      owner,
    },
  })

  const arrayInterfaceItemTypes = await Array.find({
    options: { sort: [{ name: SortDirection.Asc }] },
    selectionSet: exportArrayTypeSelectionSet,
    where: {
      owner,
    },
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
    const descendants = [
      ...(results.records[0]?.values() ?? []),
    ][0] as Array<Descendant>

    // We only get interface type descendants, since other types are pushed in front of interfaces
    const interfaceDescendants = descendants.filter(
      (type) => type.kind === ITypeKind.InterfaceType,
    )

    dependentTypes = [...interfaceDescendants, ...dependentTypes]
  }

  // Here we get all the types that needs to be added
  const orderedInterfaceTypes = dependentTypes
    .map((type) => {
      return interfaceTypes.find(
        (interfaceType) => interfaceType.id === type.id,
      )
    })
    .filter((type): type is InterfaceType => Boolean(type))

  const fieldIds = orderedInterfaceTypes.flatMap((type) => type.fields)

  const fields = await Field.find({
    options: { sort: [{ key: SortDirection.Asc }] },
    selectionSet: exportFieldSelectionSet,
    where: {
      id_IN: fieldIds.map((field) => field.id),
    },
  })

  const types = [...orderedInterfaceTypes, ...arrayInterfaceItemTypes]

  return { fields, types }
}
