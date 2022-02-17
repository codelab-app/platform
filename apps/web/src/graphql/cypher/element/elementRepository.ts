import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import duplicateElementCypher from './duplicateElement.cypher'
import getElementGraphCypher from './getElementGraph.cypher'

export type GetElementGraphResponse = {
  edges: Array<{ source: string; target: string; order: number }>
}

export type DuplicateElementResponse = {
  ids: Array<string>
}

export const elementRepository = {
  getElementGraphEdges: (
    txn: RxTransaction,
    rootId: string,
  ): Observable<GetElementGraphResponse> =>
    txn
      .run(getElementGraphCypher, { rootId })
      .records()
      .pipe(map((response) => ({ edges: response.get('edges') }))),
  duplicateElement: (
    txn: RxTransaction,
    elementId: string,
  ): Observable<DuplicateElementResponse> =>
    txn
      .run(duplicateElementCypher, { elementId })
      .records()
      .pipe(map((response) => ({ ids: response.get('ids') }))),
}
