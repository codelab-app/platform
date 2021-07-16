import cytoscape, { EdgeDataDefinition, NodeDataDefinition } from 'cytoscape'
import { breadthFirstTraversal } from './breadthFirstTraversal'
import { NodeLike } from './node'

export type TypeOrPromise<TType> = TType | Promise<TType>
export type StrippedNodeDefinition = Omit<NodeDataDefinition, 'id' | 'parent'>
export type StrippedEdgeDefinition = Omit<EdgeDataDefinition, 'from' | 'to'>

export interface TreeToCytoscapeOptions<TInput extends NodeLike<any>> {
  /** A function that will get the id from any given node */
  extractId: (node: TInput) => string

  /**
   * A function that will transform any given node to a cytoscape node definition.
   * The id and parent properties are automatically inferred, so you can skip them
   */
  mapNodeToData: (
    node: TInput,
    parentNode?: TInput,
  ) => TypeOrPromise<StrippedNodeDefinition | null>

  /**
   * A function that will transform a node and parent pair to a cytoscape edge definition.
   * The from and to are inferred from the parent (from) and node (to), so you can skip them. Return any extra data you need in the edge
   */
  mapNodeToEdgeData: (
    node: TInput,
    parentNode: TInput,
  ) => TypeOrPromise<StrippedEdgeDefinition | null>
}

export class TreeService {
  async toCytoscape<TInput extends NodeLike<any>>(
    root: TInput,
    {
      mapNodeToEdgeData,
      extractId,
      mapNodeToData,
    }: TreeToCytoscapeOptions<TInput>,
  ) {
    const cy = cytoscape()

    await breadthFirstTraversal<TInput>({
      root,
      extractId: (el) => extractId(el),
      visit: async (element, parentElement) => {
        const nodeData = await mapNodeToData(element, parentElement)

        if (nodeData) {
          cy.add({
            data: {
              id: extractId(element),
              parent: parentElement ? extractId(parentElement) : undefined,
              data: nodeData,
            },
          })
        }

        if (parentElement) {
          const edgeData = await mapNodeToEdgeData(element, parentElement)

          if (edgeData) {
            cy.add({
              data: {
                source: extractId(parentElement),
                target: extractId(element),
                ...edgeData,
              },
            })
          }
        }

        // Edge case alert:
        // sort the children by ID, because it seems that that's how dgraph executes the query
        // but sometimes results don't match that. If we start with a element with a latter id,
        // and we have elements with the same atom - the atom of the element with the latter ID won't have
        // propTypes defined, because they are already defined in the element with the prior ID
        return element.children
          ?.slice()
          .sort((a, b) => extractId(b).localeCompare(extractId(a)))
      },
    })

    return cy
  }
}
