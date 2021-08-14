import { ArrayType } from './array-type.model'
import { ComponentType } from './component-type.model'
import { ElementType } from './element-type.model'
import { EnumType } from './enum-type'
import { InterfaceType } from './interface-type.model'
import { LambdaType } from './lambda-type.model'
import { PrimitiveType } from './primitive-type'

export type TypeUnion =
  | EnumType
  | PrimitiveType
  | ArrayType
  | ComponentType
  | ElementType
  | InterfaceType
  | LambdaType
