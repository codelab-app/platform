import {
  BaseDgraphFields,
  DgraphUseCase,
  instanceOfDgraphModel,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import {
  DgraphInterface,
  DgraphTypeUnion,
  dgraphTypeUnionSchema,
  InterfaceDgraphFields,
} from '../../../models'
import {
  GetDgraphTypeQueryBuilder,
  GetDgraphTypeQueryResult,
} from './get-dgraph-type.query'
import { GetDgraphTypeRequest } from './get-dgraph-type.request'

@Injectable()
export class GetDgraphTypeService extends DgraphUseCase<
  GetDgraphTypeRequest,
  DgraphTypeUnion | null
> {
  protected async executeTransaction(
    { typeId }: GetDgraphTypeRequest,
    txn: Txn,
  ) {
    const query = new GetDgraphTypeQueryBuilder().withUidFunc(typeId).build()
    const result = await txn.query(query)
    const dataArray = (result?.getJson() as any)?.query || null

    if (!dataArray[0] || !dataArray[0][BaseDgraphFields.DgraphType]) {
      return null
    }

    const data = dataArray[0] as GetDgraphTypeQueryResult

    if (instanceOfDgraphModel(data, DgraphInterface.Metadata.modelName)) {
      // Default to returning an empty array for interfaces, because otherwise
      // it will go through the field resolver again or get stuck in some zod validation
      ;(data as DgraphInterface)[InterfaceDgraphFields.Fields] =
        dataArray[0][InterfaceDgraphFields.Fields] || []
    }

    return dgraphTypeUnionSchema.nullable().parse(data || null)
  }
}
