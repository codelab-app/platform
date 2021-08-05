import { DgraphEntityType, DgraphType, DgraphUseCase } from '@codelab/backend'
import { TypeKind } from '@codelab/ddd/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getTypeQuery } from '../get-type'
import { GetTypesInput, TypesByKindFilter } from './get-types.input'

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesInput,
  Array<DgraphType<any>>
> {
  protected async executeTransaction(request: GetTypesInput, txn: Txn) {
    return this.dgraph
      .getAll<DgraphType<any>>(txn, this.createQuery(request))
      .then((t) => t.sort((a, b) => a.uid.localeCompare(b.uid)))
  }

  private createQuery({ byIds, byKind }: GetTypesInput) {
    const qb = getTypeQuery(this.getTypeFilter(byKind))

    if (byIds) {
      qb.setUidsFunc(byIds.typeIds)
    } else {
      qb.setTypeFunc(this.getTypeFilter(byKind))
    }

    return qb
  }

  private getTypeFilter(filter?: TypesByKindFilter) {
    if (!filter) {
      return DgraphEntityType.Type
    }

    switch (filter.kind) {
      case TypeKind.PrimitiveType:
        return DgraphEntityType.PrimitiveType
      case TypeKind.ArrayType:
        return DgraphEntityType.ArrayType
      case TypeKind.InterfaceType:
        return DgraphEntityType.InterfaceType
      case TypeKind.EnumType:
        return DgraphEntityType.EnumType
      case TypeKind.LambdaType:
        return DgraphEntityType.LambdaType
      default:
        throw new Error('Unrecognized type kind option')
    }
  }
}
