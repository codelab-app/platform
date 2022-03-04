import { IPrimitiveType, TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { SnapshotOutOfModel } from 'mobx-keystone'
import { TypeModelAny } from '../store'

export const getTypeName = (
  type: Nullish<SnapshotOutOfModel<TypeModelAny>>,
): string => {
  if (!type) {
    return ''
  }

  switch (type.typeKind) {
    case TypeKind.RenderPropsType:
      return `Render Props Type`
    case TypeKind.ReactNodeType:
      return `React Node Type`
    case TypeKind.UnionType:
      return `Union Type`
    case TypeKind.PrimitiveType:
      return (type as IPrimitiveType).primitiveKind

    case TypeKind.ArrayType: {
      return `Array`
    }

    case TypeKind.EnumType:
      return `Enum (${type.allowedValues
        ?.map((v) => v.name ?? v.value)
        .join(',')})`
    case TypeKind.InterfaceType:
      return `Interface (${type.name})`
    case TypeKind.ElementType:
      return `Element (${type.elementKind})`
    case TypeKind.LambdaType:
      return `Lambda`
    case TypeKind.PageType:
      return `Page`
    case TypeKind.AppType:
      return `App`
    case TypeKind.MonacoType:
      return `Monaco (${type.language})`
    default:
      return ''
  }
}
