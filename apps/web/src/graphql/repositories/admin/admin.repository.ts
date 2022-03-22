import { TypeGraph } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import exportAdminDataCypher from './exportAdminData.cypher'

export const adminRepository = {
  getExportAdminData: (
    txn: RxTransaction,
  ): Observable<Maybe<Array<TypeGraph>>> =>
    txn
      .run(exportAdminDataCypher)
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('graph')),
      ),
}
