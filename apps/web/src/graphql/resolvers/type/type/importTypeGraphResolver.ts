import { entityMapById } from '@codelab/shared/utils'
import { from } from 'rxjs'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../../abstract/withRxTransaction'

export interface ImportTypeGraphArgs {
  payload: string
}

const makeEdgeKey = (e: any) =>
  `${e.source}-${e.target}-${e.__typename}-${
    e.__typename === 'InterfaceTypeEdge' ? e.key : ''
  }`

const emptyGraph: any = {
  __typename: 'TypeGraph',
  edges: [],
  vertices: [],
}

export const diffTypeGraph = (a: any, b: any) => {
  const aVertexMap = entityMapById(a.vertices)
  const bVertexMap = entityMapById(b.vertices)
  const aEdgesMap = new Map(a.edges.map((e: any) => [makeEdgeKey(e), e]))
  const bEdgesMap = new Map(b.edges.map((e: any) => [makeEdgeKey(e), e]))

  return {
    vertices: {
      leftOnly: a.vertices.filter((v: any) => !bVertexMap.has(v.id)),
      rightOnly: b.vertices.filter((v: any) => !aVertexMap.has(v.id)),
      common: a.vertices.filter((v: any) => bVertexMap.has(v.id)),
    },
    edges: {
      leftOnly: a.edges.filter((e: any) => !bEdgesMap.has(makeEdgeKey(e))),
      rightOnly: b.edges.filter((e: any) => !aEdgesMap.has(makeEdgeKey(e))),
      common: a.edges.filter((e: any) => bEdgesMap.has(makeEdgeKey(e))),
    },
  }
}

const importTypeGraph: IRxTxnResolver<ImportTypeGraphArgs, string> =
  ({ payload }) =>
  (txn) => {
    /*
      Loop all nodes
      if existing:
        if owned by current user -> merge
        if no owner or owner is not user -> skip
      if not existing:
         -> create, assign owner to current user

      Loop app existing relationships
      if source type is not owned by the current user or has no owner -> skip it
      if source type is owned by current user:
          if the relationship is not present in the imported graph (check for field keys) -> detach it
          if the relationship is present in the imported graph (check for field keys) -> merge it

      Loop all imported relationships. At this point all nodes are merged/created.
      if existing (check by field keys):
          if source type is owned by user -> merge
          if no owner or owner is not user -> skip
      if not existing:
          if source type is owned by user -> attach
          if no owner or owner is not user -> skip
    */

    // This must be the same shape as the result of the exportTypeGraph resolver
    // check typeRepository.exportTypeGraph for how that's formed
    // const importedGraph = JSON.parse(payload) as TypeGraph & {
    //   rootId: string
    // }

    return from([])
    // return typeRepository
    //   .getTypeGraph(
    //     txn,
    //     importedGraph.vertices.map((v) => v.id),
    //   )
    // .pipe(
    //   switchMap((existingGraph) => {
    //     const graphDiff = diffTypeGraph(
    //       importedGraph,
    //       existingGraph ?? emptyGraph,
    //     )

    //     const observables: Array<Observable<any>> = []

    //     // imported non-existing vertices
    //     for (const leftOnlyVertex of graphDiff.vertices.leftOnly) {
    //       // The promises will not be executed until the observables are subscribed to

    //       observables.push(from())
    //     }
    //   }),
    // )
  }

export const importTypeGraphResolver = withRxTransaction<any, any>(
  importTypeGraph,
)

export default importTypeGraphResolver
