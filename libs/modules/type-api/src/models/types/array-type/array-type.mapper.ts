import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { ArrayType, arrayTypeSchema } from './array-type.model'
import {
  ArrayTypeDgraphFields,
  DgraphArrayType,
} from './dgraph-array-type.model'

@Injectable()
export class ArrayTypeMapper
  implements IDgraphMapper<DgraphArrayType, ArrayType>
{
  static InputSchema = z.intersection(
    DgraphArrayType.Schema.pick({ [BaseDgraphFields.uid]: true }),
    z.object({
      [ArrayTypeDgraphFields.Type]: z.object({
        [BaseDgraphFields.uid]: z.string(),
      }),
    }),
  )

  map(input: DeepPartial<DgraphArrayType>) {
    // We don't need all the DgraphArrayType properties, so no need to use DgraphArrayType.Schema
    //just map the properties we need in the input schema, so we don't have to query the whole DgraphArrayType every time
    const dgraphArrayType = ArrayTypeMapper.InputSchema.parse(input)
    const arrayType = new ArrayType()

    arrayType.id = dgraphArrayType[BaseDgraphFields.uid]
    arrayType.typeId = dgraphArrayType[ArrayTypeDgraphFields.Type].uid

    arrayTypeSchema.parse(arrayType)

    return arrayType
  }
}
