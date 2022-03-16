import { DeleteElementsInfo } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { merge, partition } from 'lodash'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import deleteElementsSubGraphCypher from './deleteElementsSubGraph.cypher'
import duplicateElementCypher from './duplicateElement.cypher'
import getElementGraphCypher from './getElementGraph.cypher'

// contains edges for three relations PARENT_OF_ELEMENT>|INSTANCE_OF_COMPONENT>|COMPONENT_ROOT>
type RawGraphEdge = {
  source: string
  target: string
  order?: Nullish<number>
  type: string // could be one of there PARENT_OF_ELEMENT>|INSTANCE_OF_COMPONENT>|COMPONENT_ROOT>
}

export type GetElementGraphResponse = {
  edges: Array<Omit<RawGraphEdge, 'type'>>
}

export type DuplicateElementResponse = {
  ids: Array<string>
}
export type DeleteElementsResponse = {
  deletedIds?: Array<string>
  nodesDeleted: number
  relationshipsDeleted: number
}

export const elementRepository = {
  getElementGraphEdges: (
    txn: RxTransaction,
    rootId: string,
  ): Observable<GetElementGraphResponse> =>
    txn
      .run(getElementGraphCypher, { rootId })
      .records()
      .pipe(
        map((response) => {
          /**
           * Edges for subgraph
           * Element0--[PARENT_OF_ELEMENT]-->Element1--[INSTANCE_OF_COMPONENT]-->Component--[COMPONENT_ROOT]-->Element2
           *
           * We want to remove Component so that the tree is composed on elements only
           * doing this with cypher makes the query very complicated
           *
           * Element0-->Element1-->Element2
           */

          // separate edges into two groups [PARENT_OF_ELEMENT] and [INSTANCE_OF_COMPONENT, COMPONENT_ROOT]
          const [parentOfElementEdges, otherEdges] = partition(
            response.get('edges') as Array<RawGraphEdge>,
            (x: RawGraphEdge) => x.type === 'PARENT_OF_ELEMENT',
          )

          // separate [INSTANCE_OF_COMPONENT, COMPONENT_ROOT] into two groups [INSTANCE_OF_COMPONENT] and [COMPONENT_ROOT]
          const [instanceOfComponentEdges, componentRootEdges] = partition(
            otherEdges,
            (x: RawGraphEdge) => x.type === 'INSTANCE_OF_COMPONENT',
          )

          /**
           * x.source is Element2.id
           * x.target is Component.id
           *
           * @returns { [componentId]: rootElementId }
           * */
          const componentRootsMap = componentRootEdges
            .map((x) => ({ [x.target]: x.source }))
            .reduce(merge, {})

          /**
           * x.source is Element1.id
           * x.target is Component.id
           *
           * @returns { [componentId]: rootElementId }
           * */
          const elementComponentEdges = instanceOfComponentEdges.map((x) => ({
            source: x.source,
            target: componentRootsMap[x.target], // Element2.id
            order: 0,
          })) as Array<RawGraphEdge>

          return { edges: elementComponentEdges.concat(parentOfElementEdges) }
        }),
      ),

  duplicateElement: (
    txn: RxTransaction,
    elementId: string,
  ): Observable<DuplicateElementResponse> =>
    txn
      .run(duplicateElementCypher, { elementId })
      .records()
      .pipe(map((response) => ({ ids: response.get('ids') }))),

  deleteElementsSubgraph: (
    txn: RxTransaction,
    ids: Array<string>,
  ): Observable<DeleteElementsInfo> =>
    txn
      .run(deleteElementsSubGraphCypher, { ids })
      .records()
      .pipe(
        map((response) => ({
          nodesDeleted: response.get('nodesDeleted').toString(),
          relationshipsDeleted: response.get('relationshipsDeleted').toString(),
          deletedIds: response.get('deletedIds'),
        })),
      ),
}
