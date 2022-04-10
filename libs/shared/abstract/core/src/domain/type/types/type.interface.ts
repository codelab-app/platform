import { z } from 'zod'
import { AppTypeSchema } from './app-type/app-type.interface'
import { ArrayTypeSchema } from './array-type/array-type.interface'
import { TypeKind } from './base-type/type-kind.enum'
import { ElementTypeSchema } from './element-type/element-type.interface'
import { EnumTypeSchema } from './enum-type/enum-type.interface'
import { InterfaceTypeSchema } from './interface-type/interface-type.interface'
import { LambdaTypeSchema } from './lambda-type/lambda-type.interface'
import { MonacoTypeSchema } from './monaco-type/monaco-type.interface'
import { PageTypeSchema } from './page-type/page-type.interface'
import { PrimitiveTypeSchema } from './primitive-type/primitive-type.interface'
import { ReactNodeTypeSchema } from './react-node-type/react-node-type.interface'
import { RenderPropsTypeSchema } from './render-props-type/render-props-type.enum'
import { UnionTypeSchema } from './union-type/union-type.interface'

export const TypeSchema = z.union([
  ArrayTypeSchema,
  ElementTypeSchema,
  EnumTypeSchema,
  InterfaceTypeSchema,
  LambdaTypeSchema,
  PageTypeSchema,
  AppTypeSchema,
  PrimitiveTypeSchema,
  RenderPropsTypeSchema,
  ReactNodeTypeSchema,
  UnionTypeSchema,
  MonacoTypeSchema,
])

export type IAnyType = z.infer<typeof TypeSchema>

export type IType<TKind extends TypeKind> = IAnyType extends {
  typeKind: TKind
}
  ? IAnyType
  : never
