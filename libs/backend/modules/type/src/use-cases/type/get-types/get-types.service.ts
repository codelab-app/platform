import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphType, sortByUids } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTypesInput } from './get-types.input'
import { getTypesQuery } from './get-types.query'

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesInput,
  Array<DgraphType<any>>
> {
  protected async executeTransaction(request: GetTypesInput, txn: Txn) {
    return this.dgraph
      .getAll<DgraphType<any>>(txn, getTypesQuery(request))
      .then(sortByUids)
  }
}
