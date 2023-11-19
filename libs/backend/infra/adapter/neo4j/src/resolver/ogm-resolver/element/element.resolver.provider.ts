import type { IRef } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { Node } from 'neo4j-driver'
import { getDescendantsCypher, getElementTypes } from '../../../cypher'
import { OgmService } from '../../../infra'
import { Neo4jService } from '../../../infra/neo4j.service'
import { getDescendantElements } from '../../utils'
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
} from '../../../selectionSet'
import { ELEMENT_RESOLVER_PROVIDER } from './element.constant'

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<IRef, unknown>>
> = {
  inject: [OgmService, Neo4jService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (ogmService: OgmService, neo4jService: Neo4jService) => {
    const descendantElements: IFieldResolver<IRef, unknown> = (parent) =>
      getDescendantElements(neo4jService, ogmService, parent)

    const dependantTypes: IFieldResolver<IRef, unknown> = (parent) =>
      neo4jService.withReadTransaction(async (txn) => {
        const elements = await ogmService.Element.find({
          selectionSet: `{ ${elementSelectionSet} }`,
          where: { id: parent.id },
        })

        const element = elements[0]
        const apiId = element?.renderType.api.id

        const { records } = await txn.run(getElementTypes, {
          id: apiId,
        })

        const getTypes = (
          typesList: Array<{ id: string; typeName: string }>,
        ) => {
          const promises = []

          const getByType = (typeName: string) =>
            typesList
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

        const typesList = typesAndFields.filter(
          (type) => type.typeName !== 'Field',
        )

        const fieldsList = typesAndFields.filter(
          (type) => type.typeName === 'Field',
        )

        const fields = await ogmService.Field.find({
          selectionSet: `{ ${fieldSelectionSet} }`,
          where: { id_IN: fieldsList.map((field) => field.id) },
        })

        const fieldTypesList = fields.map((field) => ({
          id: field.fieldType.id,
          typeName: field.fieldType.kind,
        }))

        const allTypes = [...typesList, ...fieldTypesList]
        const dependentTypes = await Promise.all(getTypes(allTypes))

        return dependentTypes.flat()
      })

    return {
      Element: {
        dependantTypes,
        descendantElements,
      },
    }
  },
}
