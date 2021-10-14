import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphType,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTypeRequest } from './get-type.request'

type GetTypeQuery = {
  query: [DgraphType<DgraphEntityType.Type> | null]
}

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  DgraphType<DgraphEntityType.Type> | null
> {
  protected async executeTransaction(request: GetTypeRequest, txn: Txn) {
    if (request.input.where.atomId) {
      const { query } = await this.dgraph.executeQuery<GetTypeQuery>(
        txn,
        GetTypeService.getTypeByAtom(request),
      )

      return query[0]
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
        typesOfUnionType
        tags
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

  private static getTypeByAtom(request: GetTypeRequest) {
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
