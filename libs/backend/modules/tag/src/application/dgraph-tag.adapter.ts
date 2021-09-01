import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphTag, isDgraphTag } from '@codelab/backend/infra'
import {
  breadthFirstTraversal,
  CytoscapeService,
} from '@codelab/backend/shared/generic'
import { Injectable } from '@nestjs/common'
import cytoscape, { Core } from 'cytoscape'
import { Tag } from '../domain/tag.model'
import { TagEdge } from '../domain/tag-edge.model'
import { TagGraph } from '../domain/tag-graph.model'
import { TagVertex } from '../domain/tag-vertex.model'

@Injectable()
export class DgraphTagAdapter extends BaseAdapter<
  DgraphTag,
  Promise<TagGraph>
> {
  constructor(private cytoscapeService: CytoscapeService) {
    super()
  }

  async mapItem(root: DgraphTag) {
    const cy = cytoscape({ headless: true })

    await breadthFirstTraversal<DgraphTag>({
      root,
      extractId: (el) => el.uid,
      visit: (node, parentNode) => {
        return this.visit(cy, node, parentNode)
      },
    })

    const { edges, vertices } = this.cytoscapeService.treeToGraph<
      TagVertex,
      TagEdge
    >(
      cy,
      (vertex) => {
        return new Tag(vertex)
      },
      (edge) => {
        return new TagEdge(edge)
      },
    )

    return new TagGraph(vertices, edges)
  }

  private visit(cy: Core, node: DgraphTag, parentNode?: DgraphTag) {
    // if (isDgraphTagTree(node)) {
    //   //
    // }

    if (isDgraphTag(node)) {
      // Add Vertex
      cy.add({
        data: {
          id: node.uid,
          name: node.name,
          parent: parentNode?.uid,
        },
      })

      if (parentNode) {
        cy.add({
          data: {
            source: parentNode.uid,
            target: node.uid,
          },
        })
      }
    }

    return node.children
  }
}
