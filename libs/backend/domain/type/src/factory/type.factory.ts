import type { IType, ITypeWhere } from '@codelab/backend/abstract/core'
import type { ITypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  ActionType,
  EnumType,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  UnionType,
} from '../model'
import { ArrayType } from '../model/array-type.model'
import {
  ActionTypeRepository,
  ArrayTypeRepository,
  EnumTypeRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  UnionTypeRepository,
} from '../repository'

/**
 * Used for dynamic data when we don't know what type we are creating
 */
export class TypeFactory {
  static async create(
    type: ITypeDTO,
    where?: ITypeWhere,
  ): Promise<IType | undefined> {
    if (!type.__typename) {
      throw new Error('__typename must be provided')
    }

    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.PrimitiveType: {
        const primitiveType = new PrimitiveType(type)

        return await new PrimitiveTypeRepository().save(
          primitiveType,
          where as OGM_TYPES.PrimitiveTypeWhere,
        )
      }

      case ITypeKind.EnumType: {
        const enumType = new EnumType(type)

        return await new EnumTypeRepository().save(
          enumType,
          where as OGM_TYPES.EnumTypeWhere,
        )
      }

      case ITypeKind.InterfaceType: {
        const interfaceType = new InterfaceType(type)

        return await new InterfaceTypeRepository().save(
          interfaceType,
          where as OGM_TYPES.InterfaceTypeWhere,
        )
      }

      case ITypeKind.ReactNodeType: {
        const reactNodeType = new ReactNodeType(type)

        return await new ReactNodeTypeRepository().save(
          reactNodeType,
          where as OGM_TYPES.ReactNodeTypeWhere,
        )
      }

      case ITypeKind.RenderPropType: {
        const renderPropType = new RenderPropType(type)

        return await new RenderPropTypeRepository().save(
          renderPropType,
          where as OGM_TYPES.RenderPropTypeWhere,
        )
      }

      case ITypeKind.ActionType: {
        const actionType = new ActionType(type)

        return await new ActionTypeRepository().save(
          actionType,
          where as OGM_TYPES.ActionTypeWhere,
        )
      }

      case ITypeKind.UnionType: {
        const unionType = new UnionType(type)

        return await new UnionTypeRepository().save(
          unionType,
          where as OGM_TYPES.UnionTypeWhere,
        )
      }

      case ITypeKind.ArrayType: {
        const arrayType = new ArrayType(type)

        return await new ArrayTypeRepository().save(
          arrayType,
          where as OGM_TYPES.ArrayTypeWhere,
        )
      }

      default: {
        console.log('Data:', type)
        throw new Error('No type factory found')
      }
    }
  }
}
