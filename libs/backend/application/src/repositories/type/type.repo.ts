import {
  ArrayTypeOGM,
  baseSelection,
  PrimitiveTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import {
  QueryTypesArgs,
  TypeBase,
  TypeKind,
} from '@codelab/shared/abstract/codegen'
import { node, Query, relation } from 'cypher-query-builder'
import { int, Record, Transaction } from 'neo4j-driver'
import cypher from './test.cypher'

export const typeRepository = {
  typesOfTypePage: async (
    txn: Transaction,
    params: QueryTypesArgs,
  ): Promise<Array<TypeBase>> => {
    const { options } = params
    const { limit = 10, offset = 0 } = options || {}

    const { records } = await txn.run(cypher, {
      limit: int(Number(limit)),
      skip: int(Number(offset)),
    })

    const withOwner = (data: any, record: Record) => {
      const owner = record.get('owner')?.properties

      if (!owner) {
        throw new Error('owner not found')
      }

      return {
        ...data,
        owner,
      }
    }

    const baseMapper = (record: Record) => {
      const type = record.get('type').properties

      return {
        ...type,
        __typename: 'TypesPageTypeBase',
      }
    }

    const recordMappper = {
      [TypeKind.EnumType]: (record: Record) => {
        const type = baseMapper(record)

        const allowedValues = (record.get('collect(allowedValues)') || []).map(
          (type) => type.properties,
        )

        return {
          ...type,
          allowedValues,
          __typename: 'TypesPageEnumType',
        }
      },
      [TypeKind.UnionType]: (record: Record) => {
        const type = baseMapper(record)

        const unionTypes = (record.get('collect(unionTypes)') || []).map(
          (type) => type.properties,
        )

        return {
          ...type,
          typesOfUnionTypeIds: unionTypes.map((type) => type.id),
          __typename: 'TypesPageUnionType',
        }
      },
      [TypeKind.ArrayType]: (record: Record) => {
        const type = baseMapper(record)
        const itemType = record.get('itemType').properties

        return {
          ...type,
          itemType: withOwner(itemType, record),
        }
      },
    }

    const data = records.flatMap((record) => {
      const kind = record.get('type').properties.kind
      const mapper = recordMappper[kind] || baseMapper

      return withOwner(mapper(record), record)
    })

    return data
  },
}
