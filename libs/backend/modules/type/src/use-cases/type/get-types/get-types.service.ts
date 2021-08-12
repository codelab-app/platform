import { TypeKind } from '@codelab/backend/abstract/types'
import {
  DgraphEntityType,
  DgraphType,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getTypeQuery } from '../get-type'
import { GetTypesInput, TypesByKindFilter } from './get-types.input'

const compareIds = (a: DgraphType<any>, b: DgraphType<any>) =>
  a.uid.localeCompare(b.uid)

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesInput,
  Array<DgraphType<any>>
> {
  protected async executeTransaction(request: GetTypesInput, txn: Txn) {
    return this.dgraph
      .getAll<DgraphType<any>>(txn, this.createQuery(request))
      .then((t) => t.sort(compareIds))
  }

  private createQuery({ byIds, byKind, byName }: GetTypesInput) {
    const nameFilter = byName ? `match(name, "${byName.name}", 6)` : undefined
    const qb = getTypeQuery(this.getTypeFilter(byKind), nameFilter)

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
      case TypeKind.ElementType:
        return DgraphEntityType.ElementType
      default:
        throw new Error('Unrecognized type kind option')
    }
  }
}
