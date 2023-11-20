import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { getElementDependantTypes } from '../../../../cypher'
import type { Neo4jService, OgmService } from '../../../../infra'
import {
  elementSelectionSet,
  exportActionTypeSelectionSet,
  exportArrayTypeSelectionSet,
  exportEnumTypeSelectionSet,
  exportInterfaceTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropTypeSelectionSet,
  exportUnionTypeSelectionSet,
  fieldSelectionSet,
} from '../../../../selectionSet'

export const getDependantTypes = (
  neo4jService: Neo4jService,
  ogmService: OgmService,
  parent: IRef,
) => {
  return neo4jService.withReadTransaction(async (txn) => {
    const elements = await ogmService.Element.find({
      selectionSet: `{ ${elementSelectionSet} }`,
      where: { id: parent.id },
    })

    const element = elements[0]
    const apiId = element?.renderType.api.id

    const { records } = await txn.run(getElementDependantTypes, {
      id: apiId,
    })

    // if (element?.name.includes('Avatar')) {
    //   throw new Error(JSON.stringify(records, null, 2))
    // }

    const getTypes = (typesToGet: Array<{ id: string; typeName: string }>) => {
      const promises = []

      const getByType = (typeName: string) =>
        typesToGet
          .filter((type) => type.typeName === typeName)
          .map((type) => type.id)

      promises.push(
        ogmService.ArrayType.find({
          selectionSet: `{ ${exportArrayTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.ArrayType) },
        }),
      )

      promises.push(
        ogmService.EnumType.find({
          selectionSet: `{ ${exportEnumTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.EnumType) },
        }),
      )

      promises.push(
        ogmService.InterfaceType.find({
          selectionSet: `{ ${exportInterfaceTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.InterfaceType) },
        }),
      )

      promises.push(
        ogmService.UnionType.find({
          selectionSet: `{ ${exportUnionTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.UnionType) },
        }),
      )

      promises.push(
        ogmService.PrimitiveType.find({
          selectionSet: `{ ${exportPrimitiveTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.PrimitiveType) },
        }),
      )

      promises.push(
        ogmService.ReactNodeType.find({
          selectionSet: `{ ${exportReactNodeTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.ReactNodeType) },
        }),
      )

      promises.push(
        ogmService.RenderPropType.find({
          selectionSet: `{ ${exportRenderPropTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.RenderPropType) },
        }),
      )

      promises.push(
        ogmService.ActionType.find({
          selectionSet: `{ ${exportActionTypeSelectionSet} }`,
          where: { id_IN: getByType(ITypeKind.ActionType) },
        }),
      )

      return promises
    }

    const typesAndFields = records.map((rec) => ({
      id: rec.get(0).id,
      typeName: rec.get(0).__typename,
    }))

    const types = typesAndFields.filter((type) => type.typeName !== 'Field')

    const fieldsList = typesAndFields.filter(
      (type) => type.typeName === 'Field',
    )

    const fields = await ogmService.Field.find({
      selectionSet: `{ ${fieldSelectionSet} }`,
      where: { id_IN: fieldsList.map((field) => field.id) },
    })

    // if (element?.name.includes('Avatar')) {
    //   throw new Error(JSON.stringify({ fields, types }, null, 2))
    // }

    const fieldTypesList = fields
      .filter(
        (field) =>
          ![
            ITypeKind.ReactNodeType,
            ITypeKind.RenderPropType,
            ITypeKind.PrimitiveType,
            ITypeKind.ActionType,
          ].includes(field.fieldType.kind),
      )
      .map((field) => ({
        id: field.fieldType.id,
        typeName: field.fieldType.kind,
      }))

    const allTypes = [...types, ...fieldTypesList]
    const dependentTypes = await Promise.all(getTypes(allTypes))

    return dependentTypes.flat()
  })
}
