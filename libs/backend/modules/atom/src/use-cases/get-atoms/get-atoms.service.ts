import {
  DgraphAtom,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService extends DgraphUseCase<
  GetAtomsInput | undefined,
  Array<DgraphAtom>
> {
  protected executeTransaction(request: GetAtomsInput | undefined, txn: Txn) {
    if (request?.where?.ids) {
      return this.dgraph.executeQuery<DgraphAtom>(
        txn,
        GetAtomsService.createWhereIdsQuery(request.where.ids),
      )
    }

    return this.dgraph.getAll<DgraphAtom>(txn, GetAtomsService.createQuery())
  }

  private static createQuery() {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Atom)
      .addBaseFields()
      .addRecurseDirective()
      .addExpandAll()
  }

  private static createWhereIdsQuery(ids: Array<string>) {
    return (
      new DgraphQueryBuilder()
        .setUidsFunc(ids)
        // .addFilterDirective(DgraphEntityType.Atom)
        .addBaseFields()
        .addRecurseDirective()
        .addExpandAll()
    )
  }
}
