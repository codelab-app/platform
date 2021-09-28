import { DgraphArrayType } from './dgraph-array-type'
import { DgraphComponentType } from './dgraph-component-type'
import { DgraphElementType } from './dgraph-element-type'
import { DgraphEnumType } from './dgraph-enum-type'
import { DgraphInterfaceType } from './dgraph-interface-type'
import { DgraphLambdaType } from './dgraph-lambda-type'
import { DgraphPrimitiveType } from './dgraph-primitive-type'
import { DgraphReactNodeType } from './dgraph-react-node-type'
import { DgraphRenderPropsType } from './dgraph-render-props-type'

export type DgraphTypeUnion =
  | DgraphInterfaceType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphPrimitiveType
  | DgraphLambdaType
  | DgraphElementType
  | DgraphComponentType
  | DgraphRenderPropsType
  | DgraphReactNodeType
