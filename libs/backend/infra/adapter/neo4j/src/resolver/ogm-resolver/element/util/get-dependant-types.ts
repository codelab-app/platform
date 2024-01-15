import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { getElementDependantTypes } from '../../../../cypher'
import type { Neo4jService, OgmService } from '../../../../infra'
import {
  elementSelectionSet,
  exportActionTypeSelectionSet,
  exportArrayTypeSelectionSet,
  exportEnumTypeSelectionSet,
  exportInterfaceTypeWithFieldsSelectionSet,
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

    const allTypes = records.map((rec) => ({
      id: rec.get(0).id,
      typeName: rec.get(0).__typename,
    }))

    // UnionType, ArrayType, EnumType, InterfaceType
    const types = allTypes.filter((type) => type.typeName !== 'Field')

    const typesToFetch = [
      ...types,
      // Types used in fields
      ...(await getFieldTypesToFetch(ogmService, allTypes)),
    ]

    const dependantTypes = await fetchTypes(ogmService, typesToFetch)

    return dependantTypes.flat()
  })
}

const fetchTypes = async (
  ogmService: OgmService,
  types: Array<{ id: string; typeName: string }>,
) => {
  const promises = []

  promises.push(
    ogmService.ArrayType.find({
      selectionSet: `{ ${exportArrayTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.ArrayType, types) },
    }),
  )

  promises.push(
    ogmService.EnumType.find({
      selectionSet: `{ ${exportEnumTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.EnumType, types) },
    }),
  )

  promises.push(
    ogmService.InterfaceType.find({
      selectionSet: `{ ${exportInterfaceTypeWithFieldsSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.InterfaceType, types) },
    }),
  )

  promises.push(
    ogmService.UnionType.find({
      selectionSet: `{ ${exportUnionTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.UnionType, types) },
    }),
  )

  promises.push(
    ogmService.PrimitiveType.find({
      selectionSet: `{ ${exportPrimitiveTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.PrimitiveType, types) },
    }),
  )

  promises.push(
    ogmService.ReactNodeType.find({
      selectionSet: `{ ${exportReactNodeTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.ReactNodeType, types) },
    }),
  )

  promises.push(
    ogmService.RenderPropType.find({
      selectionSet: `{ ${exportRenderPropTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.RenderPropType, types) },
    }),
  )

  promises.push(
    ogmService.ActionType.find({
      selectionSet: `{ ${exportActionTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.ActionType, types) },
    }),
  )

  return await Promise.all(promises)
}

const filterByType = (
  typeName: string,
  allTypes: Array<{ id: string; typeName: string }>,
) =>
  allTypes.filter((type) => type.typeName === typeName).map((type) => type.id)

const getFieldTypesToFetch = async (
  ogmService: OgmService,
  allTypes: Array<{ id: string; typeName: string }>,
) => {
  const fieldsList = allTypes.filter((type) => type.typeName === 'Field')

  const fields = await ogmService.Field.find({
    selectionSet: `{ ${fieldSelectionSet} }`,
    where: { id_IN: fieldsList.map((field) => field.id) },
  })

  // Filtered types are already fetched in App query
  // this is to avoid getting the same type multiple times
  // when used in multiple fields
  return fields
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
}
