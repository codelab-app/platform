import {
  breadthFirstTraversal,
  CytoscapeService,
  DgraphAtom,
  DgraphComponent,
  DgraphElement,
  isDgraphComponent,
  isDgraphElement,
} from '@codelab/backend/infra'
import { typeDefinitions, TypeGraphMapper } from '@codelab/backend/modules/type'
import { TypeGraphTreeAdapter, TypeKind } from '@codelab/shared/graph'
import { Injectable } from '@nestjs/common'
import cytoscape from 'cytoscape'
import { ComponentMapper } from './component'
import { ElementMapper } from './element.mapper'
import { ElementEdge, ElementGraph, ElementVertex } from './models'

@Injectable()
export class ElementTreeTransformer {
  constructor(
    private elementMapper: ElementMapper,
    private componentMapper: ComponentMapper,
    private cytoscapeService: CytoscapeService,
    private typeGraphMapper: TypeGraphMapper,
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
    // We can provide Component ids as props. Since they are likely outside the tree, we need
    // to fetch them and put them in there, so they're available
    const componentIdsToFetch = new Set<string>()

    await breadthFirstTraversal<DgraphElement | DgraphComponent>({
      root,
      extractId: (el) => el.uid,
      visit: async (node, parentNode) => {
        if (isDgraphElement(node)) {
          if (node.atom?.['dgraph.type'] && node.atom?.['api']) {
            atomContext.set(node.atom.uid, node.atom)
          }

          cy.add({
            data: {
              id: node.uid,
              parent: parentNode?.uid,
              data: {
                ...node,
                'children|order': undefined,
                children: undefined,
              },
            },
          })

          if (parentNode) {
            cy.add({
              data: {
                source: parentNode.uid,
                target: node.uid,
                order: node['children|order'],
              },
            })
          }

          // If this is a 'full' component, ie - one that dgraph returns in full, even
          // if there are duplicate ones in the tree
          if (node.component?.['dgraph.type']) {
            componentContext.set(node.component.uid, node.component)

            if (cy.getElementById(node.component.uid).length === 0) {
              cy.add({
                data: {
                  id: node.component.uid,
                  data: node.component,
                },
              })
            }
          }

          if (node.component) {
            // Add the edge here, because if we add it in the lower block, it won't add edges from
            // different elements to the same component, since we don't visit the same node twice
            cy.add({
              data: {
                source: node.uid,
                target: node.component.uid,
              },
            })

            // Returning the component makes sure we have the parent-child relationship of element-component-element
            // instead of just element-element
            return [node.component]
          }

          const componentIdsFromProps = this.getComponentIdsFromProps(node)

          // Edge case alert:
          // sort the children by ID, because it seems that that's how dgraph executes the query
          // but sometimes results don't match that. If we start with a element with a latter id,
          // and we have elements with the same atom - the atom of the element with the latter ID won't have
          // propTypes defined, because they are already defined in the element with the prior ID
          return node.children
            ?.slice()
            .sort((a, b) => b.uid.localeCompare(a.uid))
        } else {
          const component = node as DgraphComponent

          return [component.root]
        }
      },
    })

    const { edges, vertices } = await this.cytoscapeService.treeToGraph<
      ElementVertex,
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

  private async getComponentIdsFromProps(
    node: DgraphElement,
  ): Promise<Array<string>> {
    if (!node?.props || !node?.atom?.api) {
      return []
    }

    const typeGraph = await this.typeGraphMapper.map(node.atom.api)

    const tree = new TypeGraphTreeAdapter(typeGraph, (type) => {
      const kind = typeDefinitions.find(
        (def) => type instanceof def.typeModelClass,
      )?.typeKind

      if (!kind) {
        throw new Error('Unrecognized type')
      }

      return kind
    })

    const allComponentTypes = tree.getTypes(TypeKind.ComponentType)

    // TODO
    return null!
  }
}
