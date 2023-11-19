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
  exportElementSelectionSet,
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

    const types: IFieldResolver<IRef, unknown> = (parent) =>
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

        const getType = async (typeName: string, typeId: string) => {
          switch (typeName) {
            case ITypeKind.ArrayType:
              return ogmService.ArrayType.find({
                selectionSet: `{ ${exportArrayTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.EnumType:
              return ogmService.EnumType.find({
                selectionSet: `{ ${exportEnumTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.InterfaceType:
              return ogmService.InterfaceType.find({
                selectionSet: `{ ${exportInterfaceTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.UnionType:
              return ogmService.UnionType.find({
                selectionSet: `{ ${exportUnionTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.PrimitiveType:
              return ogmService.PrimitiveType.find({
                selectionSet: `{ ${exportPrimitiveTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.ReactNodeType:
              return ogmService.ReactNodeType.find({
                selectionSet: `{ ${exportReactNodeTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.RenderPropType:
              return ogmService.RenderPropType.find({
                selectionSet: `{ ${exportRenderPropTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.ActionType:
              return ogmService.ActionType.find({
                selectionSet: `{ ${exportActionTypeSelectionSet} }`,
                where: { id: typeId },
              })

            case ITypeKind.ElementType:
              return ogmService.ElementType.find({
                selectionSet: `{ ${exportElementSelectionSet} }`,
                where: { id: typeId },
              })

            default:
              throw new Error(`Unknown type: ${typeName} = ${typeId}`)
          }
        }

        const getFieldType = async (id: string) => {
          const fields = await ogmService.Field.find({
            selectionSet: `{ ${fieldSelectionSet} }`,
            where: { id },
          })

          const field = fields[0]!

          return getType(field.fieldType.kind, field.fieldType.id)
        }

        const dependentTypes = await Promise.all(
          records.map(async (record) => {
            const typeId = record.get(0).id
            const typeName = record.get(0).__typename

            if (typeName === 'Field') {
              return getFieldType(typeId)
            }

            return getType(typeName, typeId)
          }),
        )

        return dependentTypes.flat()
      })

    return {
      Element: {
        descendantElements,
        types,
      },
    }
  },
}
