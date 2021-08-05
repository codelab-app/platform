import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphType,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  DgraphType<DgraphEntityType.Type> | null
> {
  protected executeTransaction(request: GetTypeRequest, txn: Txn) {
    return this.dgraph.getOne<DgraphType<DgraphEntityType.Type>>(
      txn,
      this.createQuery(request),
    )
  }

  private createQuery({
    input: {
      where: { id, name },
    },
  }: GetTypeRequest) {
    if (id && name) {
      throw new Error('Only 1 parameter is allowed')
    }

    const qb = new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Type)
      .addBaseFields()
      .addRecurseDirective()
      .addFields(
        `name
        primitiveKind
        itemType
        stringValue
        allowedValues
        fields
        type
        key
        description`,
      )

    if (id) {
      return qb.setUidFunc(id)
    }

    if (name) {
      return qb.addEqFilterDirective<DgraphEntityType>('name', name)
    }

    throw new Error('Missing parameters')
  }
}
