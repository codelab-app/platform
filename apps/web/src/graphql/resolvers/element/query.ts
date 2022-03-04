import { IElement, IElementGraph } from '@codelab/shared/abstract/core'
import { uuidRegex } from '@codelab/shared/utils'
import { IResolvers } from '@graphql-tools/utils'
import { difference, uniq } from 'lodash'
import { RxTransaction } from 'neo4j-driver'
import { combineLatest, from, Observable, of, zip } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { getDriver } from '../../infra/driver'
import { Component, Element } from '../../model'
import { QueryElementGraphArgs } from '../../ogm-types.gen'
import { elementRepository } from '../../repositories'
import { componentSelectionSet } from '../selectionSets/componentSelectionSet'
import { elementSelectionSet } from '../selectionSets/elementSelectionSet'

const driver = getDriver()

export const elementResolvers: IResolvers = {
  elementGraph: async (_source, args: QueryElementGraphArgs) => {
    const ElementModel = await Element()
    const session = driver.rxSession()
    const { rootId } = args.input
/**
 * find all possible components ids in element props data using ${uuidRegex}
 * eliminating already loaded components by main tree or ones referenced by parent props
 *
 * @param vertices
 * @param existingComponentsIds
 * @returns
 */
const getMissingComponentIds = (
  vertices: Array<IElement>,
  existingComponentsIds: Array<string>,
) => {
  // match all uuid by regex
  const ids = vertices
    .filter((x) => x.props?.data)
    .flatMap((element) =>
      Array.from(
        (element.props?.data as string).matchAll(uuidRegex),
        (x) => x[0], // return only the uuid (for other values reference
      ),
    )

  return difference(uniq(ids), existingComponentsIds) // exclude ${existingComponentsIds}
}

const graphWithComponents = (
  txn: RxTransaction,
  componentIds: Array<string>,
  existingComponentsIds: Array<string> = [],
  graph: IElementGraph,
): Observable<IElementGraph> =>
  from(
    Component().find({
      where: { id_IN: componentIds },
      selectionSet: componentSelectionSet,
    }),
  ).pipe(
    mergeMap((components) => {
      const componentsRootsIds = components.map((ids) => ids.rootElement.id)

      const $elementGraphs = componentsRootsIds.map((x) =>
        getElementGraph(txn, x, existingComponentsIds),
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
  )

const getElementGraph = (
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

    const ElementModel = await Element()
    const vertices = await ElementModel.find({
      where: { id_IN: elementIds },
      selectionSet: elementSelectionSet,
    })
        // load vertices
        const verticesPromise = Element().find({
          where: { id_IN: elementIds },
          selectionSet: elementSelectionSet,
        })

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

        const componentIds = getMissingComponentIds(
          vertices,
          existingComponentsIds,
        )

        const graph = { vertices, edges } as IElementGraph

        return componentIds.length
          ? graphWithComponents(txn, componentIds, existingComponentsIds, graph)
          : of(graph)
      }),
    )

export const elementQueryResolvers: IResolvers = {
  elementGraph: async (_source, args: QueryElementGraphArgs) => {
    const session = driver.rxSession()

    const $elementGraph = session.readTransaction((txn) =>
      getElementGraph(txn, args.input.rootId),
    )

    return await $elementGraph.toPromise()
  },
}

export default elementQueryResolvers
