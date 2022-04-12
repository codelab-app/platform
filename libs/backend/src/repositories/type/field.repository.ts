import { RxTransaction } from 'neo4j-driver'
import { from, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { typeRepository } from './type.repository'

export const fieldRepository = {
  createFields: (txn: RxTransaction, edges: Array<any>): Observable<any> => {
    return from(edges).pipe(
      switchMap((edge: any) => {
        if (edge.__resolveType === 'InterfaceTypeEdge') {
          return typeRepository.connectField(txn, edge.source, edge.target, {
            description: edge.description,
            key: edge.key,
            name: edge.name,
          })
        } else {
          return typeRepository.connectExtraEdge(txn, edge)
        }
      }),
    )
  },
}
