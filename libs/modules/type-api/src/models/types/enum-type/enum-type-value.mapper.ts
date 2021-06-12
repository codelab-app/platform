import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphEnumTypeValue,
  EnumTypeValueDgraphFields,
} from './dgraph-enum-type-value.model'
import { EnumTypeValue } from './enum-type-value.model'

@Injectable()
export class EnumTypeValueMapper
  implements IDgraphMapper<DgraphEnumTypeValue, EnumTypeValue>
{
  map(input: DeepPartial<DgraphEnumTypeValue>) {
    const dgraphValue = DgraphEnumTypeValue.Schema.parse(input)
    const value = new EnumTypeValue()

    value.id = dgraphValue[BaseDgraphFields.uid]
    value.name = dgraphValue[EnumTypeValueDgraphFields.Name]

    return value
  }
}
