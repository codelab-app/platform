import type { ICreateType, IOwner, IType } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type {
  BaseTypeUniqueWhereCallback,
  DistributiveOmit,
} from '@codelab/shared/abstract/types'
import { ActionTypeFactory } from './action-type.factory'
import { ArrayTypeFactory } from './array-type.factory'
import { EnumTypeFactory } from './enum-type.factory'
import { InterfaceTypeFactory } from './interface-type.factory'
import { PrimitiveTypeFactory } from './primitive-type.factory'
import { ReactNodeTypeFactory } from './react-node-type.factory'
import { RenderPropsTypeFactory } from './render-props.factory'
import { UnionTypeFactory } from './union-type.factory'

export class TypeFactory {
  static async create(
    data: DistributiveOmit<ICreateType, 'owner'>,
    owner: IOwner,
    where: BaseTypeUniqueWhereCallback<IType> = (type) => ({ id: type.name }),
  ): Promise<IType> {
    const type: ICreateType = { ...data, owner }

    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.PrimitiveType: {
        const factory = new PrimitiveTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.EnumType: {
        const factory = new EnumTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.InterfaceType: {
        const factory = new InterfaceTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.ReactNodeType: {
        const factory = new ReactNodeTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.RenderPropsType: {
        const factory = new RenderPropsTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.ActionType: {
        const factory = new ActionTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.UnionType: {
        const factory = new UnionTypeFactory()

        return await factory.create(type, where)
      }

      case ITypeKind.ArrayType: {
        const factory = new ArrayTypeFactory()

        return await factory.create(type, where)
      }

      default: {
        console.log('Data:', type)
        throw new Error('No type factory found')
      }
    }
  }
}
