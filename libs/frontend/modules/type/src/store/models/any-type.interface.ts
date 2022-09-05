import { ActionType } from './action-type.model'
import { AppType } from './app-type.model'
import { ArrayType } from './array-type.model'
import { CodeMirrorType } from './code-mirror-type.model'
import { ElementType } from './element-type.model'
import { EnumType } from './enum-type.model'
import { InterfaceType } from './interface-type.model'
import { LambdaType } from './lambda-type.model'
import { PageType } from './page-type.model'
import { PrimitiveType } from './primitive-type.model'
import { ReactNodeType } from './react-node-type.model'
import { RenderPropsType } from './render-props-type.model'
import { UnionType } from './union-type.model'

export type AnyType =
  | AppType
  | ActionType
  | ArrayType
  | ElementType
  | EnumType
  | InterfaceType
  | LambdaType
  | PageType
  | PrimitiveType
  | ReactNodeType
  | RenderPropsType
  | UnionType
  | CodeMirrorType
