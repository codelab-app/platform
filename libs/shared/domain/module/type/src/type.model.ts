import type * as cg from '@codelab/shared/infra/gql'

export const createInterfaceTypeName = (name: string) => {
  return `${name} API`
}

export type ITypeFragment =
  | cg.ActionTypeFragment
  | cg.AppTypeFragment
  | cg.ArrayTypeFragment
  | cg.CodeMirrorTypeFragment
  | cg.ElementTypeFragment
  | cg.EnumTypeFragment
  | cg.InterfaceTypeFragment
  | cg.LambdaTypeFragment
  | cg.PageTypeFragment
  | cg.PrimitiveTypeFragment
  | cg.ReactNodeTypeFragment
  | cg.RenderPropTypeFragment
  | cg.RichTextTypeFragment
  | cg.UnionTypeFragment
