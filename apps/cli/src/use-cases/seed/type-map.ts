import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import {
  AntdDesignField,
  IAtomImport,
  IPrimitiveTypeKind,
  ITypeKind,
  TypeRef,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { logTask } from '../../shared/utils/log-task'
import {
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

/**
 * Return existing type ref, or return create data for enums
 */
export const getTypeForApi = async (
  apiField: AntdDesignField,
  atom: IAtomImport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, apiField)

  const type = apiField.type.trim()
  const PrimitiveType = await Repository.instance.PrimitiveType
  const ReactNodeType = await Repository.instance.ReactNodeType
  const RenderPropsType = await Repository.instance.RenderPropsType
  const EnumType = await Repository.instance.EnumType

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

      try {
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
                    key: value,
                    value: pascalCaseToWords(value),
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
      } catch (e) {
        console.error(e)
        throw new Error()
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
      console.log(
        `Could not transform fields for Atom [${atom.type}]`,
        apiField,
      )

      return null
    }
  }
}
