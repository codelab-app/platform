import type { AppType } from './app-type.model'
import type { ArrayType } from './array-type.model'
import type { ElementType } from './element-type.model'
import type { EnumType } from './enum-type.model'
import type { InterfaceType } from './interface-type.model'
import type { LambdaType } from './lambda-type.model'
import type { MonacoType } from './mocaco-type.model'
import type { PageType } from './page-type.model'
import type { PrimitiveType } from './primitive-type.model'
import type { ReactNodeType } from './react-node-type.model'
import type { RenderPropsType } from './render-props-type.model'
import type { UnionType } from './union-type.model'

//
// Types that reference other types.
// Putting them in the same file as it cause a circular dependency otherwise
//
export type AnyType =
  | AppType
  | LambdaType
  | PageType
  | RenderPropsType
  | PrimitiveType
  | ReactNodeType
  | MonacoType
  | ElementType
  | EnumType
  | UnionType
  | InterfaceType
  | ArrayType
