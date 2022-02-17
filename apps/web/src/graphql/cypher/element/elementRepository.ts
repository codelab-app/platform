<<<<<<< HEAD
import { DeleteElementsInfo } from '@codelab/shared/abstract/codegen-v2'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import deleteElementsSubGraphCypher from './deleteElementsSubGraph.cypher'
=======
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
>>>>>>> 554af699 (feat: use reslovers for elements graph)
import duplicateElementCypher from './duplicateElement.cypher'
import getElementGraphCypher from './getElementGraph.cypher'

export type GetElementGraphResponse = {
  edges: Array<{ source: string; target: string; order: number }>
}

export type DuplicateElementResponse = {
  ids: Array<string>
}
<<<<<<< HEAD
export type DeleteElementsResponse = {
  deletedIds?: Array<string>
  nodesDeleted: number
  relationshipsDeleted: number
}
=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)

export const elementRepository = {
  getElementGraphEdges: (
    txn: RxTransaction,
    rootId: string,
  ): Observable<GetElementGraphResponse> =>
    txn
      .run(getElementGraphCypher, { rootId })
      .records()
      .pipe(map((response) => ({ edges: response.get('edges') }))),
<<<<<<< HEAD

=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
  duplicateElement: (
    txn: RxTransaction,
    elementId: string,
  ): Observable<DuplicateElementResponse> =>
    txn
      .run(duplicateElementCypher, { elementId })
      .records()
      .pipe(map((response) => ({ ids: response.get('ids') }))),
<<<<<<< HEAD

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
=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
}
