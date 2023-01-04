import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectNode } from '@codelab/shared/data'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { parseSeparators } from '../../utils/parser'
import type { FieldTypeRef } from '../../utils/type-predicates'
import { mapPrimitiveType } from '../primitive/map-primitive'

/**
 *This is a function to create Union Type, but it's a Union Type of Primitive Type
 *
 * Example: string | number, number | boolean ...
 *
 * The function will create a union type, then connect to Primitive Type
 * */
export const connectUnionType: FieldTypeRef = async ({
  field,
  atom,
  userId,
}) => {
  const UnionType = await Repository.instance.UnionType
  const values = parseSeparators(field)

  // Check if enum has been created already
  const [existingUnion] = await UnionType.find({
    where: {
      AND: [
        {
          name: `${atom.name} ${compoundCaseToTitleCase(
            field.property,
          )} Union API`,
        },
      ],
    },
  })

  // If not exist
  if (!existingUnion) {
    const unionName = `${atom.name} ${compoundCaseToTitleCase(
      field.property,
    )} Union API`

    console.log(`Creating union ${unionName}`)

    // create Union Type
    const {
      unionTypes: [unionType],
    } = await UnionType.create({
      input: [
        {
          id: v4(),
          name: unionName,
          kind: ITypeKind.UnionType,
          typesOfUnionType: {
            PrimitiveType: {
              // connect to Primitive Type
              connect: values.map((value) => ({
                where: {
                  node: {
                    name: mapPrimitiveType(value),
                  },
                },
              })),
            },
          },
          owner: connectNode(userId),
        },
      ],
    })

    if (!unionType) {
      throw new Error('Union type not created')
    }

    return {
      existingId: unionType.id,
    }
  }

  return {
    existingId: existingUnion.id,
  }
}
