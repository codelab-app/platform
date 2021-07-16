import { DgraphType, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { getTypeQuery } from './get-type.query'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  DgraphType<any>
> {
  protected executeTransaction(request: GetTypeRequest, txn: Txn) {
    return this.dgraph.getOneOrThrow<DgraphType<any>>(
      txn,
      this.createQuery(request),
    )
  }

  private createQuery({ input: { typeId } }: GetTypeRequest) {
    return getTypeQuery().setUidFunc(typeId)
  }
}
