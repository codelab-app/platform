import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphType,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  DgraphType<DgraphEntityType.Type> | null
> {
  protected async executeTransaction(request: GetTypeRequest, txn: Txn) {
    if (request.input.where.atomId) {
      return (
        await this.dgraph.executeNamedQuery<DgraphType<DgraphEntityType.Type> | null>(
          txn,
          GetTypeService.createStringQuery(request),
          'query',
        )
      )[0]
    }

    return this.dgraph.getOne<DgraphType<DgraphEntityType.Type>>(
      txn,
      GetTypeService.createQuery(request),
    )
  }

  private static createQuery({
    input: {
      where: { id, name, atomId },
    },
  }: GetTypeRequest) {
    if ([id, name, atomId].filter((x) => x).length > 1) {
      throw new Error('Only 1 parameter is allowed')
    }

    const qb = new DgraphQueryBuilder()
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
        description
        kind
        `,
      )

    if (id) {
      return qb.setUidFunc(id).addTypeFilterDirective(DgraphEntityType.Type)
    }

    if (name) {
      return qb
        .setTypeFunc(DgraphEntityType.Type)
        .addEqFilterDirective<DgraphEntityType>('name', name)
    }

    throw new Error('Missing parameters')
  }

  private static createStringQuery(request: GetTypeRequest) {
    const atomId = request.input.where.atomId

    return `
      {
        var(func: type(Type)) {
          A as uid
          dgraph.type
          ~atom @filter(uid(${atomId}))
        }
        query(func: uid(A)) @recurse {
          uid
          dgraph.type
          name
          fields
        }
      }
      `
  }
}
