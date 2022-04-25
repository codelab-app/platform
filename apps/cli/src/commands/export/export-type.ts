import {
  EnumTypeOGM,
  enumTypeSelectionSet,
  getDriver,
  getTypeDescendantsOGM,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  PrimitiveTypeOGM,
  primitiveTypeSelectionSet,
} from '@codelab/backend'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import inquirer from 'inquirer'

type Descendant = {
  id: string
  kind: ITypeKind
}

export const exportType = async () => {
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
     * Here we create the dependency tree, so during import we don't have to worry about order
     *
     * Further to the front are closer to the leaf
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

      dependentTypes = [...descendants, interfaceType, ...dependentTypes]
    }

    const allTypes = [...primitiveTypes, ...enumTypes, ...dependentTypes]

    cLog(allTypes)
  }
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
