import type {
  IBaseType,
  IPrimitiveType,
  IType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type {
  BaseUniqueWhere,
  DistributiveOmit,
} from '@codelab/shared/abstract/types'
import omit from 'lodash/omit'
import { ActionTypeFactory } from './action-type.factory'
import { EnumTypeFactory } from './enum-type.factory'
import { InterfaceTypeFactory } from './interface-type.factory'
import { PrimitiveTypeFactory } from './primitive-type.factory'
import { ReactNodeTypeFactory } from './react-node-type.factory'
import { RenderPropsTypeFactory } from './render-props.factory'

export class TypeFactory {
  static async create(
    data: DistributiveOmit<IType, 'owner'>,
    owner: IUserRef,
    where: BaseUniqueWhere,
  ) {
    const type: IType = { ...data, owner }

    /**
     * Type narrow using discriminated union
     */
    switch (type.__typename) {
      case ITypeKind.PrimitiveType: {
        const factory = new PrimitiveTypeFactory()
        await factory.create(type, where)
        break
      }

      case ITypeKind.EnumType: {
        const factory = new EnumTypeFactory()
        await factory.create(type, where)
        break
      }

      case ITypeKind.InterfaceType: {
        const factory = new InterfaceTypeFactory()
        await factory.create(type, where)
        break
      }

      case ITypeKind.ReactNodeType: {
        const factory = new ReactNodeTypeFactory()
        await factory.create(type, where)
        break
      }

      case ITypeKind.RenderPropsType: {
        const factory = new RenderPropsTypeFactory()
        await factory.create(type, where)
        break
      }

      case ITypeKind.ActionType: {
        const factory = new ActionTypeFactory()
        await factory.create(type, where)
        break
      }

      default: {
        console.log('Data:', type)
        throw new Error('No type factory found')
      }
    }
  }
}
