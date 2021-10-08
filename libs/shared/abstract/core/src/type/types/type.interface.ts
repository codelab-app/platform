import { z } from 'zod'
import { ArrayTypeSchema } from './array-type/array-type.interface'
import { ComponentTypeSchema } from './component-type/component-type.interface'
import { ElementTypeSchema } from './element-type/element-type.interface'
import { EnumTypeSchema } from './enum-type/enum-type.interface'
import { InterfaceTypeSchema } from './interface-type/interface-type.interface'
import { LambdaTypeSchema } from './lambda-type/lambda-type.interface'
import { PrimitiveTypeSchema } from './primitive-type/primitive-type.interface'
import { ReactNodeTypeSchema } from './react-node-type/react-node-type.interface'
import { RenderPropsTypeSchema } from './render-props-type/render-props-type.enum'
import { UnionTypeSchema } from './union-type/union-type.interface'

export const TypeSchema = z.union([
  ArrayTypeSchema,
  ComponentTypeSchema,
  ElementTypeSchema,
  EnumTypeSchema,
  InterfaceTypeSchema,
  LambdaTypeSchema,
  PrimitiveTypeSchema,
  RenderPropsTypeSchema,
  ReactNodeTypeSchema,
  UnionTypeSchema,
])

export type TypeId = string

export type IType = z.infer<typeof TypeSchema>
