import {
  TypeBase,
  TypeKind,
  TypesPageAnyType,
} from '@codelab/shared/abstract/codegen'
import { int, Node, Record as Neo4jRecord, Transaction } from 'neo4j-driver'
import countTypesOfPageTypesCypher from './countPageTypesOfPageType.cypher'
import getTypesOfPageTypesCypher from './getTypesOfPageTypes.cypher'
import { TypesOfTypePage } from './types'

export const typeRepository = {
  /**
   * totalCountTypes
   *   txt
   * count skip
   *
   * format and return the value
   * number
   */
  countTypesOfTypePage: async (
    txn: Transaction,
    offset = 0,
  ): Promise<number> => {
    const { records: countTypesRecords } = await txn.run(
      countTypesOfPageTypesCypher,
      {
        skip: int(Number(offset)),
      },
    )

    const totalCountNeo4j = countTypesRecords[0].get('count(type)')
    const totalCount = int(totalCountNeo4j).toNumber()

    return totalCount
  },

  /**
   * run cypher
   * record mapper
   * EnumType
   */
  typesOfTypePage: async (
    txn: Transaction,
    params: any,
  ): Promise<Array<TypesPageAnyType>> => {
    const { options } = params
    const { limit = 10, offset = 0 } = options || {}

    const { records: getTypesRecords } = await txn.run(
      getTypesOfPageTypesCypher,
      {
        limit: int(Number(limit)),
        skip: int(Number(offset)),
      },
    )

    const withOwner = (data: TypeBase, record: Neo4jRecord) => {
      const owner = record.get('owner')?.properties

      if (!owner) {
        throw new Error('owner not found')
      }

      return {
        ...data,
        owner,
      }
    }

    const baseMapper = (record: Neo4jRecord<TypesOfTypePage>) => {
      const type = record.get('type').properties

      return {
        ...type,
        __typename: 'TypesPageTypeBase',
      }
    }

    const recordMappper: Partial<
      Record<
        Partial<TypeKind>,
        (record: Neo4jRecord<TypesOfTypePage>) => TypesPageAnyType
      >
    > = {
      [TypeKind.PrimitiveType]: (record) => {
        const type = baseMapper(record)

        return {
          ...type,
          __typename: type.kind,
        }
      },
      [TypeKind.EnumType]: (record) => {
        const type = baseMapper(record)

        const allowedValues = (record.get('collect(allowedValues)') || []).map(
          (node: Node) => node.properties,
        )

        return {
          ...type,
          allowedValues,
          __typename: type.kind,
        }
      },
      [TypeKind.UnionType]: (record) => {
        const type = baseMapper(record)

        const unionTypes = (record.get('collect(unionTypes)') || []).map(
          (node: Node) => node.properties,
        )

        return {
          ...type,
          typesOfUnionTypeIds: unionTypes.map((unionType: any) => unionType.id),
          __typename: 'TypesPageUnionType',
        }
      },
      [TypeKind.ArrayType]: (record) => {
        const type = baseMapper(record)
        const itemType = record.get('itemType').properties

        return {
          ...type,
          itemType: withOwner(itemType, record),
        }
      },
    }

    const items = getTypesRecords.flatMap((record) => {
      const kind = record.get('type').properties.kind as TypeKind
      const mapper = recordMappper[kind] || baseMapper

      return withOwner(mapper(record as Neo4jRecord<TypesOfTypePage>), record)
    })

    return items
  },
}
