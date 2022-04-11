import { DeleteElementsInfo } from '@codelab/shared/abstract/codegen'
import { IElement, IElementGraph } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { uuidRegex } from '@codelab/shared/utils'
import { difference, merge, partition, uniq } from 'lodash'
import { RxTransaction } from 'neo4j-driver'
import { combineLatest, from, Observable, of, zip } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { Component, Element } from '../../model'
import { componentSelectionSet, elementSelectionSet } from '../../selectionSets'
import deleteElementsSubGraphCypher from './deleteElementsSubGraph.cypher'
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

  /**
   * find all possible components ids in element props data using ${uuidRegex}
   * eliminating already loaded components by main tree or ones referenced by parent props
   *
   * @param vertices
   * @param existingComponentsIds
   * @returns
   */
  getMissingComponentIds: (
    vertices: Array<IElement>,
    existingComponentsIds: Array<string>,
  ) => {
    // match all uuid by regex
    const ids = vertices
      .filter((x) => x.props?.data)
      .flatMap((element) =>
        Array.from(
          (element.props?.data as unknown as string).matchAll(uuidRegex),
          (x) => x[0], // return only the uuid (for other values reference
        ),
      )

    return difference(uniq(ids), existingComponentsIds) // exclude ${existingComponentsIds}
  },

  getElementGraph: (
    txn: RxTransaction,
    rootId: string,
    existingComponentsIds: Array<string> = [],
  ) =>
    elementRepository
      .getElementGraphEdges(txn, rootId)
      .pipe(
        mergeMap(({ edges }) => {
          // get root element if not edge is found
          const elementIds = edges.length
            ? uniq(edges.flatMap((x) => [x.source, x.target]))
            : [rootId]

          // load vertices
          const verticesPromise = Element().then((ElementModel) =>
            ElementModel.find({
              where: { id_IN: elementIds },
              selectionSet: elementSelectionSet,
            }),
          )

          return combineLatest([of(edges), from(verticesPromise)])
        }),
      )
      .pipe(
        mergeMap(([edges, vertices]) => {
          existingComponentsIds = existingComponentsIds.concat(
            // already loaded components by this root element
            vertices
              .filter((x) => x.component?.id)
              .map((x) => x.component?.id as string),
          )

          const componentIds = elementRepository.getMissingComponentIds(
            vertices,
            existingComponentsIds,
          )

          const graph = { vertices, edges } as IElementGraph

          return componentIds.length
            ? elementRepository.graphWithComponents(
                txn,
                componentIds,
                existingComponentsIds,
                graph,
              )
            : of(graph)
        }),
      ),

  graphWithComponents: (
    txn: RxTransaction,
    componentIds: Array<string>,
    existingComponentsIds: Array<string> = [],
    graph: IElementGraph,
  ): Observable<IElementGraph> =>
    from(
      Component().then((ComponentModel) =>
        ComponentModel.find({
          where: { id_IN: componentIds },
          selectionSet: componentSelectionSet,
        }),
      ),
    ).pipe(
      mergeMap((components) => {
        const componentsRootsIds = components.map((ids) => ids.rootElement.id)

        const $elementGraphs = componentsRootsIds.map((x) =>
          elementRepository.getElementGraph(txn, x, existingComponentsIds),
        )

        // getElementGraph accepts componentId as root too
        return zip(...$elementGraphs).pipe(
          map(
            (componentGraphs) =>
              [...componentGraphs, graph].reduce(
                (all, current) => ({
                  vertices: all.vertices.concat(current.vertices),
                  edges: all.edges.concat(current.edges),
                }),
                { edges: [], vertices: [] },
              ) as IElementGraph,
          ),
        )
      }),
    ),
}
