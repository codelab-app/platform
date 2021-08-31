import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphField,
  DgraphQueryBuilder,
  DgraphQueryField,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldByIdFilter, FieldByInterfaceFilter } from './get-field.input'
import { GetFieldRequest } from './get-field.request'

@Injectable()
export class GetFieldService extends DgraphUseCase<
  GetFieldRequest,
  DgraphField | null
> {
  protected executeTransaction(request: GetFieldRequest, txn: Txn) {
    return this.dgraph.getOne<DgraphField>(
      txn,
      GetFieldService.createQuery(request),
    )
  }

  private static createQuery({
    input: { byId, byInterface },
  }: GetFieldRequest) {
    if (byId) {
      return GetFieldService.createByIdQuery(byId)
    }

    if (byInterface) {
      return GetFieldService.createByInterfaceQuery(byInterface)
    }

    throw new Error('At least one filter must be provided to GetField')
  }

  private static createByIdQuery(byId: FieldByIdFilter) {
    return new DgraphQueryBuilder()
      .addBaseFields()
      .setUidFunc(byId.fieldId)
      .addTypeFilterDirective(DgraphEntityType.Field)
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }

  private static createByInterfaceQuery({
    fieldKey,
    interfaceId,
  }: FieldByInterfaceFilter) {
    /** {
        q(func: type(Field)) @filter(eq(dgraph.type, ${DgraphEntityType.Field}) AND uid_in(~fields, ${interfaceId}) AND eq(key, ${fieldKey}))  {
          uid
          dgraph.type
          expand(_all_)
          ~fields {
            uid
          }
        }
      } */

    return new DgraphQueryBuilder()
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(2))
      .setTypeFunc(DgraphEntityType.Field)
      .addFields(new DgraphQueryField('~fields').addBaseInnerFields())
      .addDirective(
        `@filter(eq(dgraph.type, ${DgraphEntityType.Field}) AND uid_in(~fields, ${interfaceId}) AND eq(key, ${fieldKey}))`,
      )
  }
}
