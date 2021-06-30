import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { baseDgraphTypeSchema, DgraphTypeFields } from '../dgraph-type.model'
import { ArrayType } from './array-type.model'
import {
  ArrayTypeDgraphFields,
  DgraphArrayType,
} from './dgraph-array-type.model'

@Injectable()
export class ArrayTypeMapper
  implements IDgraphMapper<DgraphArrayType, ArrayType>
{
  static InputSchema = z.lazy(() =>
    baseDgraphTypeSchema('ArrayType').extend({
      [ArrayTypeDgraphFields.Type]: z.object({
        [BaseDgraphFields.uid]: z.string(),
        [DgraphTypeFields.name]: z.string(),
      }),
    }),
  )

  map(input: DeepPartial<DgraphArrayType>) {
    // We don't need all the DgraphArrayType properties, so no need to use DgraphArrayType.Schema
    // just map the properties we need in the input schema, so we don't have to query the whole DgraphArrayType every time
    const dgraphArrayType = ArrayTypeMapper.InputSchema.parse(input)
    const id = dgraphArrayType[BaseDgraphFields.uid]
    const typeId = dgraphArrayType[ArrayTypeDgraphFields.Type].uid
    const name = dgraphArrayType[DgraphTypeFields.name]
    const arrayType = new ArrayType(id, name, typeId)

    ArrayType.Schema.parse(arrayType)

    return arrayType
  }
}
