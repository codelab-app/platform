import { SpecificIType, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from './shared/types'
import { transformAppType } from './transformers/transform-app-type'
import { transformArrayType } from './transformers/transform-array-type'
import { transformElementType } from './transformers/transform-element-type'
import { transformEnumType } from './transformers/transform-enum-type'
import { transformInterfaceType } from './transformers/transform-interface-type'
import { transformLambdaType } from './transformers/transform-lambda-type'
import { transformMonacoType } from './transformers/transform-monaco-type'
import { transformPageType } from './transformers/transform-page-type'
import { transformPrimitiveType } from './transformers/transform-primitive-type'
import { transformReactNodeType } from './transformers/transform-react-node-type'
import { transformRenderPropsType } from './transformers/transform-render-props-type'
import { transformUnionType } from './transformers/transform-union-type'

type TypeTransformerContainer = {
  [TKind in TypeKind]: TypeTransformFn<SpecificIType<TKind>>
}

// Register new type transformers here
export const typeTransformers: TypeTransformerContainer = {
  [TypeKind.PrimitiveType]: transformPrimitiveType,
  [TypeKind.UnionType]: transformUnionType,
  [TypeKind.ArrayType]: transformArrayType,
  [TypeKind.EnumType]: transformEnumType,
  [TypeKind.InterfaceType]: transformInterfaceType,
  [TypeKind.MonacoType]: transformMonacoType,
  [TypeKind.ElementType]: transformElementType,
  [TypeKind.ReactNodeType]: transformReactNodeType,
  [TypeKind.RenderPropsType]: transformRenderPropsType,
  [TypeKind.LambdaType]: transformLambdaType,
  [TypeKind.AppType]: transformAppType,
  [TypeKind.PageType]: transformPageType,
}
