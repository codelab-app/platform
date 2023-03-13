import type {
  ICreateType,
  IType,
  ITypeWhere,
} from '@codelab/backend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
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

export class TypeFactory {
  static async create(
    { id, owner, ...type }: ICreateType,
    where?: ITypeWhere,
  ): Promise<IType | undefined> {
    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.PrimitiveType: {
        const primitiveType = PrimitiveType.init({
          __typename: ITypeKind.PrimitiveType,
          id,
          owner,
          primitiveKind: type.primitiveKind,
        })

        return await new PrimitiveTypeRepository().save(
          primitiveType,
          where as OGM_TYPES.PrimitiveTypeWhere,
        )
      }

      case ITypeKind.EnumType: {
        const enumType = EnumType.init({
          __typename: ITypeKind.EnumType,
          allowedValues: type.allowedValues,
          id,
          name: type.name,
          owner,
        })

        return await new EnumTypeRepository().save(
          enumType,
          where as OGM_TYPES.EnumTypeWhere,
        )
      }

      case ITypeKind.InterfaceType: {
        const interfaceType = InterfaceType.init({
          __typename: ITypeKind.InterfaceType,
          fields: type.fields,
          id,
          name: type.name,
          owner,
        })

        return await new InterfaceTypeRepository().save(
          interfaceType,
          where as OGM_TYPES.InterfaceTypeWhere,
        )
      }

      case ITypeKind.ReactNodeType: {
        const reactNodeType = ReactNodeType.init({
          __typename: ITypeKind.ReactNodeType,
          id,
          owner,
        })

        return await new ReactNodeTypeRepository().save(
          reactNodeType,
          where as OGM_TYPES.ReactNodeTypeWhere,
        )
      }

      case ITypeKind.RenderPropsType: {
        const renderPropsType = RenderPropsType.init({
          __typename: ITypeKind.RenderPropsType,
          id,
          owner,
        })

        return await new RenderPropsTypeRepository().save(
          renderPropsType,
          where as OGM_TYPES.RenderPropsTypeWhere,
        )
      }

      case ITypeKind.ActionType: {
        const actionType = ActionType.init({
          __typename: ITypeKind.ActionType,
          id,
          owner,
        })

        return await new ActionTypeRepository().save(
          actionType,
          where as OGM_TYPES.ActionTypeWhere,
        )
      }

      case ITypeKind.UnionType: {
        const unionType = UnionType.init({
          __typename: ITypeKind.UnionType,
          id,
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
        const arrayType = ArrayType.init({
          __typename: ITypeKind.ArrayType,
          id,
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
