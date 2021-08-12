import {
  CreateTypeInput,
  ElementTypeKind,
  PrimitiveKind,
} from '@codelab/codegen/graphql'

export enum BaseTypeName {
  Lambda = 'Lambda',
  Component = 'Component',
  Element = 'Element',
  ChildElement = 'Child Element',
  DescendantElement = 'Descendant Element',
  String = 'String',
  Boolean = 'Boolean',
  Float = 'Float',
  Integer = 'Integer',
}

export const baseTypes: Array<CreateTypeInput> = [
  {
    name: BaseTypeName.String,
    primitiveType: { primitiveKind: PrimitiveKind.String },
  },
  {
    name: BaseTypeName.Boolean,
    primitiveType: { primitiveKind: PrimitiveKind.Boolean },
  },
  {
    name: BaseTypeName.Float,
    primitiveType: { primitiveKind: PrimitiveKind.Float },
  },
  {
    name: BaseTypeName.Integer,
    primitiveType: { primitiveKind: PrimitiveKind.Integer },
  },
  {
    name: BaseTypeName.Lambda,
    lambdaType: true,
  },
  {
    name: BaseTypeName.ChildElement,
    elementType: {
      kind: ElementTypeKind.ChildrenOnly,
    },
  },
  {
    name: BaseTypeName.DescendantElement,
    elementType: {
      kind: ElementTypeKind.DescendantsOnly,
    },
  },
  {
    name: BaseTypeName.Element,
    elementType: {
      kind: ElementTypeKind.AllElements,
    },
  },
]
