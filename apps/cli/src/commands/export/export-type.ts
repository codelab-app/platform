import {
  EnumTypeOGM,
  enumTypeSelectionSet,
  getDriver,
  getTypeDescendantsOGM,
  InterfaceType as IInterfaceType,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  PrimitiveTypeOGM,
  primitiveTypeSelectionSet,
} from '@codelab/backend'
import {
  IBaseTypeDTO,
  ITypeDTO,
  ITypeExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import inquirer from 'inquirer'
import { difference } from 'lodash'

type Descendant = {
  id: string
  kind: ITypeKind
}

type ExportTypeData = {
  types: Array<ITypeExport>
}

export const exportType = async (): Promise<ExportTypeData> => {
  /**
   * Export types
   */
  const confirmExportType = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to export Types',
    },
  ])

  if (confirmExportType['confirm']) {
    /**
     * Export all primitive types
     */
    const PrimitiveType = await PrimitiveTypeOGM()

    const primitiveTypes = await PrimitiveType.find({
      selectionSet: primitiveTypeSelectionSet,
    })

    /**
     * Enum
     */
    const EnumType = await EnumTypeOGM()

    const enumTypes = await EnumType.find({
      selectionSet: enumTypeSelectionSet,
    })

    /**
     * Export all types
     *
     * Go through each interface, then grab all descendant ids of it
     */
    const InterfaceType = await InterfaceTypeOGM()

    const interfaceTypes = await InterfaceType.find({
      selectionSet: interfaceTypeSelectionSet,
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
        ...results.records[0].values(),
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
        return interfaceTypes.find((t) => t.id === type.id)
      })
      .filter((x): x is IInterfaceType => !!x)

    const allTypes = [...primitiveTypes, ...enumTypes, ...orderedInterfaceTypes]

    return { types: allTypes }
  }

  return { types: [] }
}

// export const typeFactory = async (kind: ITypeKind, ids: Array<string>) => {
//   switch (kind) {
//     case ITypeKind.PrimitiveType: {
//       const PrimitiveType = await PrimitiveTypeModel()
//
//       const primitiveTypes = await PrimitiveType.find({
//         where: {
//           id_IN: ids,
//         },
//         selectionSet: primitiveTypeSelectionSet,
//       })
//
//       return primitiveTypes
//     }
//
//     case ITypeKind.EnumType: {
//       const EnumType = await EnumTypeModel()
//
//       const enumTypes = await EnumType.find({
//         where: {
//           id_IN: ids,
//         },
//         selectionSet: enumTypeSelectionSet,
//       })
//
//       return enumTypes
//     }
//
//     case ITypeKind.InterfaceType: {
//       const InterfaceType = await InterfaceTypeModel()
//
//       const interfaceTypes = await InterfaceType.find({
//         selectionSet: interfaceTypeSelectionSet,
//       })
//
//       return interfaceTypes
//     }
//
//     default:
//       throw new Error('Incorrect type')
//   }
// }
