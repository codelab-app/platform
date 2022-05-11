import {
  EnumTypeOGM,
  enumTypeSelectionSet,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  PrimitiveTypeOGM,
  primitiveTypeSelectionSet,
  ReactNodeTypeOGM,
  reactNodeTypeSelectionSet,
} from '@codelab/backend'
import { ITypeExport } from '@codelab/shared/abstract/core'
import { ExportTypeData } from './export-user-types'

export const exportSeedTypes = async (): Promise<ExportTypeData> => {
  /**
   * Export all primitive types
   */
  const PrimitiveType = await PrimitiveTypeOGM()

  const primitiveTypes = await PrimitiveType.find({
    selectionSet: primitiveTypeSelectionSet,
  })

  /**
   * React Node Type
   */
  const ReactNodeType = await ReactNodeTypeOGM()

  // Only 1 here
  const reactNodeTypes = await ReactNodeType.find({
    selectionSet: reactNodeTypeSelectionSet,
  })

  /**
   * Enum
   */
  const EnumType = await EnumTypeOGM()

  const enumTypes = await EnumType.find({
    selectionSet: enumTypeSelectionSet,
  })

  /**
   * Get all interfaces that are connected to atoms, here we don't do dependent types since Ant Design atoms don't have them (at least I haven't seen any)
   *
   * We will go through dependent types for user interfaces however
   */
  const InterfaceType = await InterfaceTypeOGM()

  const interfaceTypes = await InterfaceType.find({
    where: {
      apiOfAtomsAggregate: {
        count_GT: 0,
      },
    },
    selectionSet: interfaceTypeSelectionSet,
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  const allTypes = [
    ...primitiveTypes,
    ...reactNodeTypes,
    ...enumTypes,
    // Put interfaces last since they depend on primitive types when seeding
    ...interfaceTypes,
  ] as Array<ITypeExport>

  return { types: allTypes }
}
