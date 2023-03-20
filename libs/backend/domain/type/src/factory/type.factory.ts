import type { IType, ITypeWhere } from '@codelab/backend/abstract/core'
import type {
  IPrimitiveTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  ActionType,
  EnumType,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
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
  RenderPropsTypeRepository,
  UnionTypeRepository,
} from '../repository'

/**
 * Used for dynamic data when we don't know what type we are creating
 */
export class TypeFactory {
  static async create(
    { id, owner, ...type }: ITypeDTO,
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
        const primitiveType = new PrimitiveType({
          id,
          kind: ITypeKind.PrimitiveType,
          name: ITypeKind.PrimitiveType,
          owner,
          primitiveKind: type.primitiveKind,
        })

        return await new PrimitiveTypeRepository().save(
          primitiveType,
          where as OGM_TYPES.PrimitiveTypeWhere,
        )
      }

      case ITypeKind.EnumType: {
        const enumType = new EnumType({
          allowedValues: type.allowedValues,
          id,
          kind: ITypeKind.EnumType,
          name: type.name,
          owner,
        })

        return await new EnumTypeRepository().save(
          enumType,
          where as OGM_TYPES.EnumTypeWhere,
        )
      }

      case ITypeKind.InterfaceType: {
        const interfaceType = new InterfaceType({
          fields: type.fields,
          id,
          kind: ITypeKind.InterfaceType,
          name: type.name,
          owner,
        })

        return await new InterfaceTypeRepository().save(
          interfaceType,
          where as OGM_TYPES.InterfaceTypeWhere,
        )
      }

      case ITypeKind.ReactNodeType: {
        const reactNodeType = new ReactNodeType({
          id,
          kind: ITypeKind.ReactNodeType,
          name: ITypeKind.ReactNodeType,
          owner,
        })

        return await new ReactNodeTypeRepository().save(
          reactNodeType,
          where as OGM_TYPES.ReactNodeTypeWhere,
        )
      }

      case ITypeKind.RenderPropsType: {
        const renderPropsType = new RenderPropsType({
          id,
          kind: ITypeKind.RenderPropsType,
          name: ITypeKind.RenderPropsType,
          owner,
        })

        return await new RenderPropsTypeRepository().save(
          renderPropsType,
          where as OGM_TYPES.RenderPropsTypeWhere,
        )
      }

      case ITypeKind.ActionType: {
        const actionType = new ActionType({
          id,
          kind: ITypeKind.ActionType,
          name: ITypeKind.ActionType,
          owner,
        })

        return await new ActionTypeRepository().save(
          actionType,
          where as OGM_TYPES.ActionTypeWhere,
        )
      }

      case ITypeKind.UnionType: {
        const unionType = new UnionType({
          id,
          kind: ITypeKind.UnionType,
          name: type.name,
          owner,
          typesOfUnionType: [],
        })

        return await new UnionTypeRepository().save(
          unionType,
          where as OGM_TYPES.UnionTypeWhere,
        )
      }

      case ITypeKind.ArrayType: {
        const arrayType = new ArrayType({
          id,
          kind: ITypeKind.ArrayType,
          name: type.name,
          owner,
        })

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
