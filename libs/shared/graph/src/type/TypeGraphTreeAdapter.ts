import { ITypeGraph, ITypeTree, TypeCytoscapeTree } from './contracts'
import { graphToCytoscape } from './graphToCytoscape'

export class TypeGraphTreeAdapter
  extends TypeCytoscapeTree
  implements ITypeTree
{
  constructor(graph: ITypeGraph | null | undefined) {
    super(graphToCytoscape(graph))
  }
}
