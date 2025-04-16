import type { IAntDesignField } from '@codelab/backend-abstract-core'
import type { ITypeDto } from '@codelab/shared-abstract-core'
import type { DistributivePick } from '@codelab/shared-abstract-types'

import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared-abstract-core'

import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isRenderPropType,
  isUnionType,
} from '../parser'

export class AntDesignTypeMapper {
  static mapPrimitiveType = (value: string) => {
    switch (value) {
      case 'boolean':
        return IPrimitiveTypeKind.Boolean
      case 'integer':
        return IPrimitiveTypeKind.Integer
      case 'number':
        return IPrimitiveTypeKind.Number
      case 'string':
        return IPrimitiveTypeKind.String
      default:
        throw new Error('Invalid value')
    }
  }

  static mapType = (
    field: Pick<IAntDesignField, 'property' | 'type'>,
  ): DistributivePick<ITypeDto, 'kind'> | null => {
    if (isEnumType(field.type)) {
      return { kind: ITypeKind.EnumType }
    }

    if (isReactNodeType(field.type)) {
      return { kind: ITypeKind.ReactNodeType }
    }

    if (isRenderPropType(field.type)) {
      return { kind: ITypeKind.RenderPropType }
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
