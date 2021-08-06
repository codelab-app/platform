import { DgraphArrayType } from './dgraph-array-type'
import { DgraphEnumType } from './dgraph-enum-type'
import { DgraphInterfaceType } from './dgraph-interface-type'
import { DgraphPrimitiveType } from './dgraph-primitive-type'

export type DgraphTypeUnion =
  | DgraphInterfaceType
  | DgraphArrayType
  | DgraphEnumType
  | DgraphPrimitiveType
