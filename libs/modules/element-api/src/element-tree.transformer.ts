import {
  CytoscapeService,
  DgraphAtom,
  DgraphElement,
  TreeService,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Core } from 'cytoscape'
import { ElementMapper } from './element.mapper'
import { Element, ElementEdge, ElementGraph } from './models'

@Injectable()
export class ElementTreeTransformer {
  constructor(
    private elementMapper: ElementMapper,
    private cytoscapeService: CytoscapeService,
    private treeService: TreeService,
  ) {}

  /**
   * Transforms a DgraphElement to an ElementGraph
   * @param root
   */
  async transform(root: DgraphElement): Promise<ElementGraph> {
    return this.cyToGraph(await this.toCytoscape(root))
  }

  private async toCytoscape(root: DgraphElement) {
    // Keep the atoms in a context, because if there are duplicate atoms anywhere in the tree
    // dgraph will return only the ID of the atom after the first time
    const atomContext = new Map<string, DgraphAtom>()
    // const componentContext = new Map<string, DgraphAtom>()

    return this.treeService.toCytoscape(root, {
      extractId: (node) => node.uid,
      mapNodeToData: (node) => {
        const atom =
          node.atom?.uid && atomContext.has(node.atom?.uid)
            ? atomContext.get(node.atom?.uid)
            : node.atom

        if (node.atom?.['dgraph.type']) {
          atomContext.set(node.atom.uid, node.atom)
        }

        // TODO component in context and add it as root nodes

        return {
          ...node,
          'children|order': undefined,
          children: undefined,
          atom,
        }
      },
      mapNodeToEdgeData: (node) => ({ order: node['children|order'] }),
    })
  }

  private async cyToGraph(cy: Core): Promise<ElementGraph> {
    const { edges, vertices } = await this.cytoscapeService.treeToGraph<
      Element,
      ElementEdge
    >(
      cy,
      (node) => this.elementMapper.map(node.data),
      (edgeData) =>
        new ElementEdge(edgeData.source, edgeData.target, edgeData.order),
    )

    return new ElementGraph(vertices, edges)
  }
}
