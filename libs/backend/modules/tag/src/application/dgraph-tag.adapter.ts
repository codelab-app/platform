import { BaseAdapter } from '@codelab/backend/abstract/core'
import {
  breadthFirstTraversal,
  CytoscapeService,
  DgraphTag,
  isDgraphTag,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Core } from 'cytoscape'
import { Tag } from '../domain/tag.model'
import { TagEdge } from '../domain/tag-edge.model'
import { TagGraph } from '../domain/tag-graph.model'
import { TagVertex } from '../domain/tag-vertex.model'

@Injectable()
export class DgraphTagAdapter extends BaseAdapter<DgraphTag, TagGraph> {
  private readonly cy: Core

  constructor(private cytoscapeService: CytoscapeService) {
    super()
    this.cy = cytoscapeService.cy
  }

  async mapItem(root: DgraphTag) {
    await breadthFirstTraversal<DgraphTag>({
      root,
      extractId: (el) => el.uid,
      visit: (node, parentNode) => {
        return this.visit(node, parentNode)
      },
    })

    const { edges, vertices } = this.cytoscapeService.treeToGraph<
      TagVertex,
      TagEdge
    >(
      this.cy,
      (vertex) => {
        return new Tag(vertex)
      },
      (edge) => {
        return new TagEdge(edge)
      },
    )

    return new TagGraph(vertices, edges)
  }

  private visit(node: DgraphTag, parentNode?: DgraphTag) {
    // if (isDgraphTagTree(node)) {
    //   //
    // }

    if (isDgraphTag(node)) {
      // Add Vertex
      this.cy.add({
        data: {
          id: node.uid,
          name: node.name,
          parent: parentNode?.uid,
        },
      })

      if (parentNode) {
        this.cy.add({
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
