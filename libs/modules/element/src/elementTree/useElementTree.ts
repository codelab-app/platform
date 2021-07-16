import {
  ElementEdge,
  ElementFragment,
  ElementGraphFragment,
} from '@codelab/codegen/graphql'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { SingularElementArgument } from 'cytoscape'
import { useCallback } from 'react'
import { ElementTree } from './ElementTree'

//
// Hook:
//
const edgeId = (sourceId: string, targetId: string) =>
  `${sourceId}--${targetId}`

const getElementFromNode = (node: SingularElementArgument) =>
  (node?.data()?.data as ElementFragment) ?? null

const getEdgeDataFromEdge = (edge: SingularElementArgument) =>
  (edge?.data()?.data as ElementEdge) ?? null

const getEdgeOrder = (edge: SingularElementArgument) =>
  getEdgeDataFromEdge(edge)?.order ?? 0

/**
 * Parses a ElementGraph and provides helper methods for it
 */
export const useElementTree = ({
  edges,
  vertices,
}: ElementGraphFragment): ElementTree => {
  const cy = cytoscape({
    headless: true,
    elements: {
      nodes: vertices.map((v) => ({
        data: { id: v.id, data: v },
      })),
      edges: edges.map((v) => ({
        data: {
          source: v.source,
          target: v.target,
          data: v,
          id: edgeId(v.source, v.target),
        },
      })),
    },
  })

  const getPathFromRoot = useCallback(
    (elementId: string) => {
      const path = cy.elements().aStar({
        root: `#${cy.elements().roots().first().id()}`,
        directed: true,
        goal: `#${elementId}`,
      })

      return {
        found: path.found,
        path: path.path.map((e) => e.id()),
      }
    },
    [cy],
  )

  const getAndTree = useCallback(() => {
    const root = cy.elements().roots().first()
    let tree: DataNode | null = null
    const nodes: Record<string, DataNode> = {}
    const nodeOrder: Record<string, number> = {}

    cy.elements().breadthFirstSearch({
      root,
      visit: (visitedNode, edge) => {
        const element = getElementFromNode(visitedNode)
        const order = getEdgeOrder(edge)

        const node = {
          ...element,
          // draggable: data.type !== AtomType.ReactRglItem,
          // disabled: data.type === VertexType.React_RGL_Item,
          key: element.id,
          title: element.name,
        }

        nodes[element.id] = node
        nodeOrder[element.id] = order

        if (tree === null) {
          tree = node
        }

        if (edge) {
          const parent = edge.source()
          const parentNode = nodes[parent.id()]
          const existingChildren = parentNode.children

          parentNode.children = Array.isArray(existingChildren)
            ? [...existingChildren, node].sort(
                (a, b) => nodeOrder[a.key] - nodeOrder[b.key],
              )
            : [node]
        }
      },
    })

    return tree as unknown as DataNode
  }, [cy])

  const getElementById = useCallback(
    (id: string) => cy.getElementById(id).first().map(getElementFromNode)[0],
    [cy],
  )

  const getParent = useCallback(
    (id: string) =>
      cy
        .getElementById(id)
        .incomers()
        .nodes()
        .first()
        .map(getElementFromNode)[0],
    [cy],
  )

  const getOrderInParent = useCallback(
    (id: string) =>
      cy.getElementById(id).incomers().edges().first().map(getEdgeOrder)[0],
    [cy],
  )

  const getAllElements = useCallback(
    () => cy.elements().map(getElementFromNode),
    [cy],
  )

  const getRoot = useCallback(
    () => cy.elements().roots().first().map(getElementFromNode)[0],
    [cy],
  )

  const getChildren = useCallback(
    (elementId: string) => {
      // element.children() doesn't work (because we don't set the parent property I think)
      return cy
        .getElementById(elementId)
        .outgoers()
        .nodes()
        .map(getElementFromNode)
    },
    [cy],
  )

  return {
    getPathFromRoot,
    getAndTree,
    getElementById,
    getParent,
    getOrderInParent,
    getAllElements,
    getRoot,
    getChildren,
  }
}
