import {
  ITypeGraph,
  ITypeTree,
  TypeClassifierFn,
  TypeCytoscapeTree,
} from './contracts'
import { graphToCytoscape } from './graphToCytoscape'

export class TypeGraphTreeAdapter
  extends TypeCytoscapeTree
  implements ITypeTree
{
  constructor(
    graph: ITypeGraph | null | undefined,
    typeClassifier: TypeClassifierFn,
  ) {
    super(graphToCytoscape(graph), typeClassifier)
  }
}
