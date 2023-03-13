import type { AntDesignField, IType } from '@codelab/backend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { DistributivePick } from '@codelab/shared/abstract/types'
import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isRenderPropsType,
  isUnionType,
} from '../parser'

export class AntDesignTypeMapper {
  static mapPrimitiveType = (value: string) => {
    switch (value) {
      case 'boolean':
        return IPrimitiveTypeKind.Boolean
      case 'string':
        return IPrimitiveTypeKind.String
      case 'number':
        return IPrimitiveTypeKind.Number
      case 'integer':
        return IPrimitiveTypeKind.Integer
      default:
        throw new Error('Invalid value')
    }
  }

  static mapType = (
    field: Pick<AntDesignField, 'property' | 'type'>,
  ): DistributivePick<IType, 'kind'> | null => {
    if (isEnumType(field.type)) {
      return { kind: ITypeKind.EnumType }
    }

    if (isReactNodeType(field.type)) {
      return { kind: ITypeKind.ReactNodeType }
    }

    if (isRenderPropsType(field.type)) {
      return { kind: ITypeKind.RenderPropsType }
    }

    if (isUnionType(field.type)) {
      return { kind: ITypeKind.UnionType }
    }

    if (isPrimitiveType(field.type)) {
      return { kind: ITypeKind.PrimitiveType }
    }

    if (isActionType(field.type)) {
      return { kind: ITypeKind.ActionType }
    }

    if (isInterfaceType(field.type)) {
      return { kind: ITypeKind.InterfaceType }
    }

    console.log('Cannot map Ant Design type', field)

    return null
  }
}
