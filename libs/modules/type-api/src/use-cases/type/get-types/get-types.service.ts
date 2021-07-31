import { DgraphEntityType, DgraphType, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getTypeQuery } from '../get-type'
import { GetTypesInput, TypeKind, TypesByKindFilter } from './get-types.input'

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
      case TypeKind.Primitive:
        return DgraphEntityType.PrimitiveType
      case TypeKind.Array:
        return DgraphEntityType.ArrayType
      case TypeKind.Interface:
        return DgraphEntityType.InterfaceType
      case TypeKind.Enum:
        return DgraphEntityType.EnumType
      default:
        throw new Error('Unrecognized type kind option')
    }
  }
}
