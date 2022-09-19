import {
  EnumTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
  UnionTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import {
  IAtomExport,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { AntdDesignApi } from './ant-design'
import {
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

type TypeRef = {
  existingId: string
} | null

/**
 * Return existing type ref, or return create data for enums
 */
export const getTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomExport,
  userId: string,
): Promise<TypeRef> => {
  const type = apiField.type.trim()
  const PrimitiveType = await PrimitiveTypeOGM()
  const ReactNodeType = await ReactNodeTypeOGM()
  const RenderPropsType = await RenderPropsTypeOGM()
  const EnumType = await EnumTypeOGM()
  const UnionType = await UnionTypeOGM()

  // if (apiField.isUnion) {
  //   const [unionType] = await UnionType.find({
  //     where: {
  //       name: ITypeKind.UnionType,
  //     },
  //   })

  //   return {
  //     existingId: unionType.id,
  //   }
  // }

  // if (apiField.type.indexOf('|') > -1) {
  //   const [unionType] = await UnionType.find({
  //     where: {
  //       name: ITypeKind.UnionType,
  //     },
  //   })

  //   return {
  //     existingId: unionType.id,
  //   }
  // }

  if (apiField.isEnum) {
    const enumValues = apiField.type.split('|').map((v) => v.trim())

    /**
     * Check if enum has been created already
     */
    const [existingEnum] = await EnumType.find({
      where: {
        AND: [
          {
            name: `${atom.name} ${pascalCaseToWords(apiField.property)} Enum`,
          },
        ],
      },
    })

    if (!existingEnum) {
      const enumName = `${atom.name} ${pascalCaseToWords(
        apiField.property,
      )} Enum`

      console.log(`Creating enum ${enumName}`)

      const {
        enumTypes: [enumType],
      } = await EnumType.create({
        input: [
          {
            id: v4(),
            name: enumName,
            kind: ITypeKind.EnumType,
            allowedValues: {
              create: enumValues.map((value) => ({
                node: {
                  id: v4(),
                  value,
                  name: pascalCaseToWords(value),
                },
              })),
            },
            owner: connectTypeId(userId),
          },
        ],
      })

      return {
        existingId: enumType.id,
      }
    }

    return {
      existingId: existingEnum.id,
    }
  }

  if (isReactNodeTypeRegex.test(type)) {
    const [renderNodeType] = await ReactNodeType.find({
      where: {
        name: ITypeKind.ReactNodeType,
      },
    })

    return {
      existingId: renderNodeType.id,
    }
  }

  if (isRenderPropType(type)) {
    const [renderPropsType] = await RenderPropsType.find({
      where: {
        name: ITypeKind.RenderPropsType,
      },
    })

    return {
      existingId: renderPropsType.id,
    }
  }

  // console.log(apiField)

  switch (type) {
    case 'boolean': {
      const [booleanType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.Boolean,
        },
      })

      return {
        existingId: booleanType.id,
      }
    }

    case 'number': {
      const [floatType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.Float,
        },
      })

      return {
        existingId: floatType.id,
      }
    }

    case 'number | string':
    case 'string | number':

    // eslint-disable-next-line no-fallthrough
    case 'string': {
      const [stringType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.String,
        },
      })

      return {
        existingId: stringType.id,
      }
    }

    default: {
      // console.log(
      //   `Could not transform fields for Atom [${atom.type}]`,
      //   apiField,
      // )
      // console.log('ALO ALoO')

      return null
    }
  }
}
