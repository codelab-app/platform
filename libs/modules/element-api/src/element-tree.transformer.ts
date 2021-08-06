import {
  breadthFirstTraversal,
  CytoscapeService,
  DgraphAtom,
  DgraphComponent,
  DgraphElement,
  isDgraphComponent,
  isDgraphElement,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import cytoscape from 'cytoscape'
import { ComponentMapper } from './component'
import { ElementMapper } from './element.mapper'
import { ElementEdge, ElementGraph, ElementGraphVertex } from './models'

@Injectable()
export class ElementTreeTransformer {
  constructor(
    private elementMapper: ElementMapper,
    private componentMapper: ComponentMapper,
    private cytoscapeService: CytoscapeService,
  ) {}

  /**
   * Transforms a DgraphElement to an ElementGraph
   * @param root
   */
  async transform(root: DgraphElement): Promise<ElementGraph> {
    // Keep the atoms in a context, because if there are duplicate atoms anywhere in the tree
    // dgraph will return only the ID of the atom after the first time
    const atomContext = new Map<string, DgraphAtom>()
    const componentContext = new Map<string, DgraphComponent>()
    const cy = cytoscape()

    await breadthFirstTraversal<DgraphElement | DgraphComponent>({
      root,
      extractId: (el) => el.uid,
      visit: async (node, parentNode) => {
        if (isDgraphElement(node)) {
          const element = node as DgraphElement

          if (element.atom?.['dgraph.type'] && element.atom?.['api']) {
            atomContext.set(element.atom.uid, element.atom)
          }

          cy.add({
            data: {
              id: element.uid,
              parent: parentNode?.uid,
              data: {
                ...element,
                'children|order': undefined,
                children: undefined,
              },
            },
          })

          if (parentNode) {
            cy.add({
              data: {
                source: parentNode.uid,
                target: element.uid,
                order: element['children|order'],
              },
            })
          }

          // If this is a 'full' component, ie - one that dgraph returns in full, even
          // if there are duplicate ones in the tree
          if (element.component?.['dgraph.type']) {
            componentContext.set(element.component.uid, element.component)

            if (cy.getElementById(element.component.uid).length === 0) {
              cy.add({
                data: {
                  id: element.component.uid,
                  data: element.component,
                },
              })
            }
          }

          if (element.component) {
            // Add the edge here, because if we add it in the lower block, it won't add edges from
            // different elements to the same component, since we don't visit the same node twice
            cy.add({
              data: {
                source: element.uid,
                target: element.component.uid,
              },
            })

            // Returning the component makes sure we have the parent-child relationship of element-component-element
            // instead of just element-element
            return [element.component]
          }

          // Edge case alert:
          // sort the children by ID, because it seems that that's how dgraph executes the query
          // but sometimes results don't match that. If we start with a element with a latter id,
          // and we have elements with the same atom - the atom of the element with the latter ID won't have
          // propTypes defined, because they are already defined in the element with the prior ID
          return element.children
            ?.slice()
            .sort((a, b) => b.uid.localeCompare(a.uid))
        } else {
          const component = node as DgraphComponent

          return [component.root]
        }
      },
    })

    const { edges, vertices } = await this.cytoscapeService.treeToGraph<
      ElementGraphVertex,
      ElementEdge
    >(
      cy,
      (node) => {
        if (isDgraphComponent(node.data)) {
          return this.componentMapper.map(node.data)
        }

        const element = node.data as DgraphElement

        const atom =
          element.atom?.uid && atomContext.has(element.atom?.uid)
            ? atomContext.get(element.atom?.uid)
            : element.atom

        const component =
          element.component?.uid && componentContext.has(element.component?.uid)
            ? componentContext.get(element.component?.uid)
            : element.component

        return this.elementMapper.map({ ...element, atom, component })
      },
      (edgeData) =>
        new ElementEdge(edgeData.source, edgeData.target, edgeData.order),
    )

    return new ElementGraph(vertices, edges)
  }
}
