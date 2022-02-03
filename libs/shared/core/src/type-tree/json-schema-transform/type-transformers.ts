import { SpecificIType, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from './shared/types'
import { appTypeToJsonSchema } from './transformers/app-type-to-json-schema'
import { arrayTypeToJsonSchema } from './transformers/array-type-to-json-schema'
import { elementTypeToJsonSchema } from './transformers/element-type-to-json-schema'
import { enumTypeToJsonSchema } from './transformers/enum-type-to-json-schema'
import { interfaceTypeToJsonSchema } from './transformers/interface-type-to-json-schema'
import { lambdaTypeToJsonSchema } from './transformers/lambda-type-to-json-schema'
import { monacoTypeToJsonSchema } from './transformers/monaco-type-to-json-schema'
import { pageTypeToJsonSchema } from './transformers/page-type-to-json-schema'
import { reactNodeTypeToJsonSchema } from './transformers/react-node-type-to-json-schema'
import { renderPropsTypeToJsonSchema } from './transformers/render-props-type-to-json-schema'
import { transformPrimitiveType } from './transformers/transform-primitive-type'
import { unionTypeToJsonSchema } from './transformers/union-type-to-json-schema'

type TypeTransformerContainer = {
  [TKind in TypeKind]: TypeTransformFn<SpecificIType<TKind>>
}

// Register new type transformers here
export const typeTransformers: TypeTransformerContainer = {
  [TypeKind.PrimitiveType]: transformPrimitiveType,
  [TypeKind.UnionType]: unionTypeToJsonSchema,
  [TypeKind.ArrayType]: arrayTypeToJsonSchema,
  [TypeKind.EnumType]: enumTypeToJsonSchema,
  [TypeKind.InterfaceType]: interfaceTypeToJsonSchema,
  [TypeKind.MonacoType]: monacoTypeToJsonSchema,
  [TypeKind.ElementType]: elementTypeToJsonSchema,
  [TypeKind.ReactNodeType]: reactNodeTypeToJsonSchema,
  [TypeKind.RenderPropsType]: renderPropsTypeToJsonSchema,
  [TypeKind.LambdaType]: lambdaTypeToJsonSchema,
  [TypeKind.AppType]: appTypeToJsonSchema,
  [TypeKind.PageType]: pageTypeToJsonSchema,
}
