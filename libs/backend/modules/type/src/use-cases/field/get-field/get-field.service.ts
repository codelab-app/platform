import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { FieldSchema, IField } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldByIdFilter, FieldByInterfaceFilter } from './get-field.input'
import { GetFieldRequest } from './get-field.request'

@Injectable()
export class GetFieldService extends DgraphUseCase<
  GetFieldRequest,
  IField | null
> {
  protected schema = FieldSchema.optional().nullable()

  protected executeTransaction(request: GetFieldRequest, txn: Txn) {
    return this.dgraph.getOneNamed<IField>(
      txn,
      GetFieldService.createQuery(request),
      'query',
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
    return GetFieldService.getFieldQuery(` @filter(uid(${byId.fieldId}))`)
  }

  private static createByInterfaceQuery({
    fieldKey,
    interfaceId,
  }: FieldByInterfaceFilter) {
    return GetFieldService.getFieldQuery(
      `@filter(uid_in(~fields, ${interfaceId}) AND eq(key, ${fieldKey}))`,
    )
  }

  public static getFieldQuery(filter?: string) {
    return `{
        query(func: type(${DgraphEntityType.Field})) @normalize ${
      filter ?? ''
    } {
          id: uid
          key: key
          name: name
          description: description
          type {
            target: uid
          }
          ~fields {
            source: uid
          }
        }
      }`
  }
}
