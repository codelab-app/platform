import { ImportAdminDataInput } from '../../ogm-types.gen'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

const exportData: IRxTxnResolver<ImportAdminDataInput, string> =
  (payload) => (txn) => {
    console.log('.... payload,........', txn, payload)
    // return typeRepository
    //   .getTypeGraph(
    //     txn,
    //     payload
    //   )
    // .pipe(
    //   switchMap((existingGraph) => {
    //     // console.log('.......... ......... existing graph........',)
    //     // const graphDiff = diffTypeGraph(
    //     //   importedGraph,
    //     //   existingGraph ?? emptyGraph,
    //     // )

    //     // const observables: Array<Observable<any>> = []

    //     // // imported non-existing vertices
    //     // for (const leftOnlyVertex of graphDiff.vertices.leftOnly) {
    //     //   // The promises will not be executed until the observables are subscribed to

    //     //   observables.push(from())
    //     // }
    //   }),
    // )
  }

export const exportAllTypesGraph = withRxTransaction<any, any>(exportData)
