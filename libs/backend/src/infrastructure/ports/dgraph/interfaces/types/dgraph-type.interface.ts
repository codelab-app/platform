import { DgraphArrayType } from './dgraph-array-type'
import { DgraphElementType } from './dgraph-element-type'
import { DgraphEnumType } from './dgraph-enum-type'
import { DgraphInterfaceType } from './dgraph-interface-type'
import { DgraphLambdaType } from './dgraph-lambda-type'
import { DgraphPrimitiveType } from './dgraph-primitive-type'

export type DgraphTypeUnion =
  | DgraphInterfaceType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphPrimitiveType
  | DgraphLambdaType
  | DgraphElementType
