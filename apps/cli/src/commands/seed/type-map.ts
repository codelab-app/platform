import {
  EnumTypeOGM,
  EnumTypeValueOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend'
import {
  ICreateTypeDTO,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { AntdDesignApi } from './ant-design'
import { createEnumTypeInputForAtomType } from './utils/enum'
import {
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

type TypeRef =
  | {
      existingId: string
    }
  | {
      newType: Omit<ICreateTypeDTO, 'auth0Id'>
    }
  | void

/**
 * Return existing type ref, or return create data for enums
 */
export const getTypeForApi = async (
  apiField: AntdDesignApi,
  atomName: string,
): Promise<TypeRef> => {
  const type = apiField.type.trim()
  const PrimitiveType = await PrimitiveTypeOGM()
  const ReactNodeType = await ReactNodeTypeOGM()
  const RenderPropsType = await RenderPropsTypeOGM()
  const EnumType = await EnumTypeOGM()
  const EnumTypeValue = await EnumTypeValueOGM()

  if (apiField.isEnum) {
    const enumValues = apiField.type.split('|').map((v) => v.trim())

    // Here we upsert the enum and return the id
    await EnumTypeValue.find()

    return {
      newType: createEnumTypeInputForAtomType(
        atomName,
        apiField.property,
        enumValues,
      ),
    }
  }

  if (isReactNodeTypeRegex.test(type)) {
    const [renderNodeType] = await ReactNodeType.find({
      where: {
        name: ITypeKind.RenderPropsType,
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
  }

  return
}
