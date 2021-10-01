import {
  BaseTypeName,
  ElementTypeKind,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../../use-cases/type/create-type'

export const baseTypes: Array<CreateTypeInput> = [
  {
    name: BaseTypeName.String,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: {
      primitiveKind: PrimitiveKind.String,
    },
  },
  {
    name: BaseTypeName.Boolean,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Boolean },
  },
  {
    name: BaseTypeName.Float,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Float },
  },
  {
    name: BaseTypeName.Integer,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveKind.Integer },
  },
  {
    name: BaseTypeName.Lambda,
    typeKind: TypeKind.LambdaType,
  },
  {
    name: BaseTypeName.ChildElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.ChildrenOnly,
    },
  },
  {
    name: BaseTypeName.DescendantElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.DescendantsOnly,
    },
  },
  {
    name: BaseTypeName.Element,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.AllElements,
    },
  },
  {
    name: BaseTypeName.Component,
    typeKind: TypeKind.ComponentType,
  },
  {
    name: BaseTypeName.RenderProps,
    typeKind: TypeKind.RenderPropsType,
  },
  {
    name: BaseTypeName.ReactNode,
    typeKind: TypeKind.ReactNodeType,
  },
]
