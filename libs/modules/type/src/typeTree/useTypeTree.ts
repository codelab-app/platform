import {
  __FieldFragment,
  __TypeFragment,
  __TypeGraphFragment,
  TypeEdgeKind,
} from '@codelab/codegen/graphql'
import cytoscape, {
  CollectionReturnValue,
  SingularElementArgument,
} from 'cytoscape'
import { useCallback } from 'react'
import { TypeTree } from './TypeTree'

//
// Node / Edge helpers:
//

const edgeIsOfFieldKind = (e: SingularElementArgument) =>
  e.data().kind === TypeEdgeKind.Field && !!e.data().field

const getFieldFromEdge = (e: SingularElementArgument) =>
  e.data().field as __FieldFragment

const getTypeFromNode = (e: SingularElementArgument) =>
  e.data() as __TypeFragment

const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers(arrayItemEdgeSelector).nodes().first())

const arrayItemEdgeSelector = `[kind=${TypeEdgeKind.ArrayItem}]`

//
// Hook:
//

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: __TypeGraphFragment | null): TypeTree => {
  const { edges, vertices } = graph ?? { edges: [], vertices: [] }

  const cy = cytoscape({
    headless: true,
    elements: {
      nodes: vertices.map((v) => ({
        data: { ...v },
      })),
      edges: edges.map((v) => ({
        data: { ...v, id: v.field?.id },
      })),
    },
  })

  const getRootFields = useCallback(() => {
    return cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }, [cy])

  const getFieldsOf = useCallback(
    (typeId: string) => {
      return cy
        .getElementById(typeId)
        .connectedEdges()
        .filter(edgeIsOfFieldKind)
        .map(getFieldFromEdge)
    },
    [cy],
  )

  const getFieldType = useCallback(
    (fieldId: string) => {
      const node = cy.getElementById(fieldId).targets().first()

      return node ? getTypeFromNode(node) : null
    },
    [cy],
  )

  const getType = useCallback(
    (typeId: string) => {
      const node = cy.getElementById(typeId).first()

      return node ? getTypeFromNode(node) : null
    },
    [cy],
  )

  const getArrayItemType = useCallback(
    (arrayTypeId: string) => {
      return getItemTypeFromNode(cy.getElementById(arrayTypeId)) ?? null
    },
    [cy],
  )

  return { getRootFields, getFieldType, getType, getArrayItemType, getFieldsOf }
}
