import { ITypeGraph, ITypeTree } from './contracts'
import { graphToCytoscape } from './graphToCytoscape'
import { TypeTree } from './TypeTree'

export class TypeGraphTreeAdapter extends TypeTree implements ITypeTree {
  constructor(graph: ITypeGraph | null | undefined) {
    super(graphToCytoscape(graph))
  }
}
